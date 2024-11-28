import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faFlag } from "@fortawesome/free-solid-svg-icons";
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

import UserContext from "../context/userContext";

import '../styles/Preview_Product_Page.scss';

function Preview() {
    const { userType } = useContext(UserContext);

    // xử lý hiện box report
    const [show_report_box, setShow_report_box] = useState(false);
    const handleClose = () => setShow_report_box(false);
    const handleShow = () => setShow_report_box(true);

    let [selectedReason, setSelectedReason] = useState(""); // Lý do được chọn
    const reasons = [
        "The product shows signs of being a scam",
        "Counterfeit or fake goods",
        "The product has unclear origin or source",
        "The product images are unclear",
        "The product contains images or content that is offensive or potentially misleading",
    ];

    useEffect(() => {
        if (show_report_box) 
            setSelectedReason(""); // Reset lý do khi mở modal
    }, [show_report_box]);

    const handleSubmit = () => {
        if (selectedReason.trim() === "") 
            alert("Please select a reason before submitting the report!");
        else {
            alert(`Your report has been submitted with the reason: ${selectedReason}`);
            handleClose(); 
        }
    };

  
  

  const dummyProducts = Array(16).fill({  // tạo tạm trước khi có sb
    id: '1',
    image: '/mostSearch-laptop.jpg', 
    name: 'Tên đồ', 
    price: 'Giá tiền', 
  });

  // tạm nốt cái product luôn
  const product = {
    id: 1,
    name: "iPod Classic",
    price: "2,500,000 VND",
    location: "TP Hồ Chí Minh",
    images: [
      "/ipod-preview-1.jpg",
      "/ipod-preview-2.jpg",
      "/ipod-preview-3.jpg",
      "/ipod-preview-4.jpg",
    ],
    details: {
      condition: "New",
      brand: "Apple",
      postedDate: "24/11/2024",
    },
    seller: {
      avatar: "/avt1.jpg",
      name: "Hitori",
      rating: "4.8/5",
    },
  };


    const [mainImage, setMainImage] = useState("");
    useEffect(() => setMainImage(product.images[0]), []);


  return (
    <div className="main-container">
    
      <div className="header-wrapper">
        <Header userType={userType} />
      </div>

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
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">{product.price}</p>
                  <p className="product-location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#FB8500" }} />{" "}
                      {product.location}
                  </p>
        
                  {userType === "buyer" && (
                      <div className="action-buttons">
                          <Button className="add-to-cart"> Add to Cart </Button>
                          <Button className="buy-now"> Buy Now </Button>
                      </div>
                  )}
      
                  <div className="product-details">
                      <h4>Details</h4>
                          <ul>
                              <li>Condition: {product.details.condition}</li>
                              <li>Brand: {product.details.brand}</li>
                              <li>Posted: {product.details.postedDate}</li>
                          </ul>
                  </div>

                  <div className="seller-info">
                      <img src={product.seller.avatar} alt="Seller Avatar" className="seller-avatar" />
                      <p className="seller-name">{product.seller.name}</p>
                      <p className="seller-rating">Rating: {product.seller.rating}</p>
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
