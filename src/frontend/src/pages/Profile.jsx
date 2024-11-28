import React, { useContext } from "react";
import { Tabs, Tab, Card, Button } from "react-bootstrap";
import UserContext from "../context/userContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BuyerProduct from "../components/BuyerProduct";
import UserSidebar from "../components/UserSidebar";

import "../styles/Profile.scss";

function Profile() {
  const { userType } = useContext(UserContext);

  const userInfo = {
    avatar: "/avt1png",
    name: "John Doe",
    joinDate: "Tháng 11 năm 2024",
    numItems: 20,
    rating: 4.8,
  };

  const orders = [
    {
      name: "Tên hàng",
      price: "₫300.000",
      shopName: "shop's name",
      status: "confirming",
    },
    {
      name: "Tên hàng",
      price: "₫300.000",
      shopName: "shop's name",
      status: "shipping",
    },
    {
      name: "Tên hàng",
      price: "₫300.000",
      shopName: "shop's name",
      status: "received",
    },
    {
      name: "Tên hàng",
      price: "₫300.000",
      shopName: "shop's name",
      status: "canceled",
    },
  ];

  return (
    <div className="main-container">
      {/* Header */}
      <div className="header-wrapper">
        <Header />
      </div>

      
      <div className="profile-page-container">
        
      <div className="profile-sidebar">
        <UserSidebar userType={userType} userInfo={userInfo} />
      </div>

      <div className="profile-content">
    {userType === "buyer" &&
      orders.map((order, index) => <BuyerProduct key={index} order={order} />)}
  </div>
      
      
    </div>
    <Footer />
    </div>
  );
};


export default Profile;
