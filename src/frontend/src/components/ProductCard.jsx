import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Button } from "react-bootstrap";
import UserContext from "../context/userContext";
import "../styles/ProductCard.scss";

const ProductCard = ({ id, image, name, price }) => {
  const navigate = useNavigate();
  const { userType } = useContext(UserContext);

  const handleSeePreview = () => {
    if (userType === "guest") navigate("/");
    else navigate(`/preview_product/${id}`);
  }
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
        <Button className="preview-button" onClick={handleSeePreview}>
          See preview
        </Button>
      </Card>
    </div>
  );
};

export default ProductCard;
