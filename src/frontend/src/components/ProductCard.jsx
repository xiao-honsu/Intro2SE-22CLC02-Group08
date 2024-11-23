import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/ProductCard.scss"; 
const ProductCard = ({ image, name, price }) => {
  return (
    <div className="product-card-container">
      <Card className="product-card">
        <Card.Img
          variant="top"
          src={image}
          className="product-card-img"
          alt={name}
        />
        <Card.Body className="product-card-body">
          <Card.Title className="product-card-title">{name}</Card.Title>
          <p className="product-card-price">{price}</p>
        </Card.Body>
        <button className="preview-button">See preview</button>
      </Card>
    </div>
  );
};

export default ProductCard;
