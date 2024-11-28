import React from "react";
import { Card, Button } from "react-bootstrap";

const BuyerProduct = ({ order }) => {
  // Function to render buttons based on status
  const renderButtons = (status) => {
    switch (status) {
      case "confirming":
        return (
          <>
            <Button variant="warning" className="me-2">
              View shop
            </Button>
            <Button variant="danger">Cancel</Button>
          </>
        );
      case "shipping":
        return (
          <Button variant="warning">
            View shop
          </Button>
        );
      case "received":
        return (
          <>
            <Button variant="warning" className="me-2">
              View shop
            </Button>
            <Button variant="success">Rating</Button>
          </>
        );
      case "canceled":
        return (
          <Button variant="warning">
            View shop
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="order-card mb-3">
      <Card.Body>
        <div className="d-flex align-items-center">
          {/* Product Image */}
          <img
            src={order.image || "/product-placeholder.png"}
            alt={order.name}
            className="order-image me-3"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              border: "1px solid #ccc",
            }}
          />
          {/* Product Info */}
          <div className="flex-grow-1">
            <h5>{order.name}</h5>
            <p>{order.price}</p>
            <p>{order.shopName}</p>
          </div>
          {/* Status */}
          <p className="text-end fw-bold">Status: {order.status}</p>
        </div>
        {/* Action Buttons */}
        <div className="d-flex justify-content-start mt-3">
          {renderButtons(order.status)}
        </div>
      </Card.Body>
    </Card>
  );
};

export default BuyerProduct;
