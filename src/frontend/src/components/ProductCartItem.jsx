import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import "../styles/ProductCartItem.scss";

const ProductCartItem = ({ product }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/Payment");
  };

  return (
    <div className="product-card-container">
      <Card className="order-card mb-3">
        <Card.Body>
          <div className="order-info d-flex align-items-center">
            <div className="order-image">
              <img
                src={product.image || "/product-placeholder.png"}
                alt={product.name}
              />
            </div>

            <div className="order-details">
              <div className="details">
                <h5>{product.name}</h5>
                <h3>{product.price}</h3>
                <div className="seller-info">
            <img
              src={product.seller.avatar}
              alt="Seller Avatar"
              className="seller-avatar"
            />
            <div className="seller-info-detail">
              <p className="seller-name">{product.seller.name}</p>
              <p className="seller-rating">Rating: {product.seller.rating}</p>
            </div>
          </div>
              </div>
              <div className="order-actions d-flex justify-content-start mt-3">
                <Button className="btn" onClick={handleBuyNow}>Buy now</Button>
              </div>
            </div>
          </div>
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCartItem;
