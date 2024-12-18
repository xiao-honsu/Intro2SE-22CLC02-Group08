import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";

import "../styles/SellerProduct.scss";
import productAPI from "../services/product";

const SellerProduct = ({ list_orders }) => {
  const [orders, setOrders] = useState(list_orders);
  const navigate = useNavigate();
  useEffect(() => {
    setOrders(list_orders);
  }, [list_orders]);

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", fontSize: "18px" }}>
        
      </div>
    );
  }
  
  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure to delete this product?");
    if (!confirm) return;

    try {
      const res = await productAPI.deleteProduct(productId);
      if (res.success) {
        setOrders((prev) => prev.filter((order) => order._id !== productId));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("error deleting product:", error);
      alert("an error occured while deleting product");
    }
  };

  const handleDetail = (productId) => {
    navigate(`/ProductDetail/${productId}`);
  };

  return (
    <div className="order-list">
      {orders.map((order, index) => (
        <Card className="order-card mb-3" key={index}>
          <Card.Body>
            <Badge bg="secondary" className="status-container">Status: {order.status}</Badge>
            <div className="order-info d-flex align-items-center">
              <div className="order-image" >
                <img src={order.images[0] || "/product-placeholder.png"} alt={order.productName} />
              </div>
              
              <div className="order-details">
                <div className="details">
                  <h5>{order.productName}</h5>
                  <h3>{order.price}</h3>
                  <p>{order.sellerID.username}</p>
                </div>
              </div>
              
            </div>
            <div className="order-actions d-flex justify-content-start mt-3">
                  {order.status === "Pending Approval" && <Button className="btn" onClick={() => handleDelete(order._id)}>Delete</Button>}
                  {order.status === "Not Purchased" && <Button className="btn" onClick={() => handleDelete(order._id)}>Delete</Button>}
                  <Button className="btn" onClick={() => handleDetail(order._id)}>Detail</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SellerProduct;
