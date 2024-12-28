import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Modal, Form  } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import orderAPI from '../services/order';
import feedbackAPI from '../services/feedback';

import "../styles/BuyerProduct.scss";

const BuyerProduct = ({ orders, onOrdersChange }) => {
    const [show_rating_box, setShow_rating_box] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState("");
    
    const handleClose = () => setShow_rating_box(false);
    const handleShow = () => setShow_rating_box(true);
  
    useEffect(() => {
        if (show_rating_box) {
            setRating(0); 
            setFeedbackText("");
        }
          
    }, [show_rating_box]);

    const handleStarClick = (index) => {
        if (rating === index - 0.5) {
            setRating(index); 
        } else if (rating === index) {
            setRating(0); 
        } else {
            setRating(index - 0.5); 
        }
    };
    
    const handleCancelOrder = async (orderId) => {
        try {
            const response = await orderAPI.updateOrderStatus(orderId, "Cancelled")
            if (response.success) {
                alert("Order cancelled successfully!");
                if (onOrdersChange) {
                    onOrdersChange(); 
                }
            } else {
                alert(response.message || "Failed to cancel order.");
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };
  
    const handleSubmit = async (order) => {
        const feedbackText = document.querySelector("textarea").value.trim(); 
        if (rating === 0) {
            alert("Please select a rating before submitting your feedback.");
            return;
        }
        if (!feedbackText) {
            alert("Please write some feedback before submitting.");
            return;
        }
        console.log("Order data:", order);

        console.log("Submitting feedback data:", {
            sellerID: order.productID.sellerID,
            buyerID: order.buyerID,
            rating,
            comment: feedbackText
        });
        try {
            const response = await feedbackAPI.createFeedback({
                sellerID: order.productID.sellerID,
                buyerID: order.buyerID,
                rating,
                comment: feedbackText,
                productName: order.productID.productName,
            });
    
            if (response.success) {
                alert(`Thank you for your feedback! You rated ${rating} stars and wrote: "${feedbackText}".`);
                handleClose(); 
            } else {
                alert(response.message || "Failed to submit feedback.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("An error occurred while submitting feedback.");
        }
    };


    if (orders.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "20px", fontSize: "18px" }}>
                No products match.
            </div>
        );
    }

    return (
        <div className="order-list">
            {orders.map((order, index) => (
                <Card className="order-card mb-3" key={index}>
                    <Card.Body>
                    <Badge bg="secondary" className="status-container">Status: {order.status}</Badge>
                        <div className="order-info d-flex align-items-center">
                            <div className="order-image" >
                                <img src={order.productID.images[0] || "/product-placeholder.png"} alt={order.productID.productName} />
                            </div>
              
                            <div className="order-details">
                                <div className="details">
                                    <h5>{order.productID.productName}</h5>
                                    <h3>{order.productID.price}</h3>
                                </div>              
                            </div>
                        </div>
                        <div className="order-actions d-flex justify-content-start mt-3">
                            {order.status === "Confirming" && <Button className="btn" onClick={() => handleCancelOrder(order._id)}>Cancel</Button>}
                            {order.status === "Received" && <Button className="btn" onClick={handleShow}>Rating</Button>}
                            <Button className="btn">View shop</Button>
                        </div>

                        <Modal show={show_rating_box} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Feedback seller</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="star-container" style={{ display: "flex", justifyContent: "center", gap: "5px", cursor: "pointer", marginBottom: "20px" }}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} onClick={() => handleStarClick(i + 1)} style={{ fontSize: "24px", color: "#FFD700" }} >
                                            {rating >= i + 1 ? ( <FontAwesomeIcon icon={faStar} /> ) : 
                                            rating >= i + 0.5 ? (<FontAwesomeIcon icon={faStarHalfAlt} />) : 
                                            ( <FontAwesomeIcon icon={faStarRegular} />)}
                                        </span>
                                    ))}
                                </div>
                                <textarea value={feedbackText} placeholder="Feedback here" onChange={(e) => setFeedbackText(e.target.value)}
                                    style={{ width: "100%", height: "100px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", fontSize: "16px", resize: "none" }}
                                ></textarea>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                                <Button variant="primary" onClick={() => handleSubmit(order)}> Send </Button>
                            </Modal.Footer>
                        </Modal>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default BuyerProduct;
