import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faFlag, faUser } from "@fortawesome/free-solid-svg-icons";
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

import UserContext from "../context/userContext";
import productAPI from "../services/product";
import cartAPI from "../services/cart";
import feedbackAPI from '../services/feedback';

import '../styles/Preview_Product_Page.scss';


function Preview() {
    const { userType, setUserType, userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");

    // start report
    const [show_report_box, setShow_report_box] = useState(false);
    const handleClose = () => setShow_report_box(false);
    const handleShow = () => setShow_report_box(true);

    let [selectedReason, setSelectedReason] = useState(""); 
    const reasons = [
        "The product shows signs of being a scam",
        "Counterfeit or fake goods",
        "The product has unclear origin or source",
        "The product images are unclear",
        "The product contains images or content that is offensive or potentially misleading",
    ];

    useEffect(() => {
        if (show_report_box) 
            setSelectedReason(""); 
    }, [show_report_box]);

    const handleSubmit = () => {
        if (selectedReason.trim() === "") 
            alert("Please select a reason before submitting the report!");
        else {
            alert(`Your report has been submitted with the reason: ${selectedReason}`);
            handleClose(); 
        }
    };
    // end report


    // start get detail, image, rating
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await productAPI.getProductById(id);
                if (response.success) {
                    setProduct(response.product);
                } else {
                    console.error(response.message);
                } 
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false); 
            }
        };
    
        fetchProductDetail();
    }, [id]);

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setMainImage(product.images[0]);
        }
    }, [product]);
    
    useEffect(() => {
        const fetchRating = async () => {
            if (!product || !product.sellerID) return;
    
            try {
                const response = await feedbackAPI.getRatingBySeller(product.sellerID._id);
                if (response.success) {
                    setRating(response.averageRating);
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching rating:", error);
            }
        };
    
        fetchRating();
    }, [product]);
    // end

    const handleAddToCart = async (buyerID, productID) => {
        try {
            const response = await cartAPI.addToCart(buyerID, productID);
    
            if (response.success) {
                alert("Product added to cart successfully!");
            } else {
                alert(response.message || "Failed to add product to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("An error occurred while adding to cart.");
        }
    };


    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found.</div>;


    const dummyProducts = Array(16).fill({  
        id: '1',
        image: '/mostSearch-laptop.jpg', 
        name: 'Tên đồ', 
        price: 'Giá tiền', 
    });

    return (
        <div className="main-container">
            <Header />

            <div className="home-container">    
                <div className="product-details-container">
                    <div className="product-images">
                        <div className="thumbnail-list">
                            {product.images.map((image, index) => (
                                <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className="thumbnail" onClick={() => setMainImage(image)} />
                            ))}
                        </div>
                    <div className="main-image">
                        <img src={mainImage} alt="Main Product" />
                    </div>
                </div>

     
                <div className="product-info">
                    <h2 className="product-name">{product.productName}</h2>
                    <p className="product-price">{product.price}</p>
                    <p className="product-location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#FB8500" }} />{" "}
                            {product.address}
                    </p>
        
                    {userType === "buyer" && (
                        <div className="action-buttons">
                            <Button className="add-to-cart" onClick={() => handleAddToCart(userInfo.userId, product._id)}> Add to Cart </Button>
                            <Button className="buy-now" onClick={() => navigate(`/Payment/${product._id}`)}> Buy Now </Button>
                        </div>
                    )}
      
                    <div className="product-details">
                        <h4>Details</h4>
                        <ul>
                            <li>Description: {product.description}</li>
                            <li>Posted: {new Date(product.statusUpdatedAt).toLocaleDateString()}</li>
                        </ul>
                    </div>

                    <div className="seller-info">
                        <Link to={`/profile/${product.sellerID._id}`} className="seller-avatar-link">
                        {product.sellerID.avatar ? (  
                            <img src={product.sellerID.avatar} alt="Seller Avatar" className="seller-avatar" />
                        ) : (
                            <FontAwesomeIcon icon={faUser} />
                        )} 
                        </Link>
                        <Link to={`/profile/${product.sellerID._id}`} className="seller-name-link">
                            <p className="seller-name">{product.sellerID.username}</p>
                        </Link>
                        <p className="seller-rating">Rating: {rating}</p>
                    </div>

                    <Button className="report-button" onClick={handleShow}>
                        <FontAwesomeIcon icon={faFlag} style={{ color: "#FF4D4D", marginRight: "8px" }} />Report
                    </Button>

                    <Modal show={show_report_box} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Choose a reason</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
          
                            <Form>
                                {reasons.map((reason, index) => (
                                    <Form.Check key={index} type="radio" id={`reason-${index}`} name="report-reason" label={reason} value={reason}
                                        onChange={(e) => setSelectedReason(e.target.value)}/>
                                ))}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                            <Button variant="primary" onClick={handleSubmit}> Send report </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>



            <div className="product-list-container">
                <h2 className="product-list-title">Similar items</h2>
                <div className="product-grid">
                    {dummyProducts.map((product) => (
                      <ProductCard key={product.id} id={product.id} image={product.image} name={product.name} price={product.price} />
                    ))}
                </div>
            </div>

            <Footer showBanner={ false } />

            </div>
        </div>
    );
}

export default Preview;
