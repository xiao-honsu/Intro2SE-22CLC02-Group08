import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

import "../styles/SellerProduct.scss";

const SellerProduct = ({ orders }) => {
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
                <img src={order.image || "/product-placeholder.png"} alt={order.name} />
              </div>
              
              <div className="order-details">
                <div className="details">
                  <h5>{order.name}</h5>
                  <h3>{order.price}</h3>
                  <p>{order.shopName}</p>
                </div>
              </div>
              
            </div>
            <div className="order-actions d-flex justify-content-start mt-3">
                  {order.status === "Pending Approval" && <Button className="btn">Delete</Button>}
                  {order.status === "Not Purchased" && <Button className="btn">Delete</Button>}
                  <Button className="btn">Detail</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SellerProduct;
