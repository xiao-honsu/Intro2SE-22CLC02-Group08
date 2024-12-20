import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";


import "../styles/ProductCartItem.scss";

const ProductCartItem = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="product-card-container">
            <Card className="order-card mb-3">
                <Card.Body>
                    <div className="order-info d-flex align-items-center">
                        <div className="order-image">
                            <img src={product.images[0]} alt={product.productName} />
                        </div>

                        <div className="order-details">
                            <div className="details">
                                <h5>{product.productName}</h5>
                                <h3>{product.price}</h3>
                                <div className="seller-info">
                                    <div className="seller-info-detail">
                                        <Link to={`/profile/${product.sellerID._id}`} className="seller-name-link">
                                            <p className="seller-name">{product.sellerID.username}</p>
                                        </Link>                         
                                    </div>
                                </div>
                            </div>
                            <div className="order-actions d-flex justify-content-start mt-3">
                                <Button className="btn" onClick={() => navigate(`/preview_product/${product._id}`)}>See preview</Button>
                            </div>
                        </div>
                    </div>
          
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProductCartItem;
