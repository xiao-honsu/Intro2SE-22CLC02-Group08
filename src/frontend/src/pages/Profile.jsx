import React, { useContext, useEffect, useState } from 'react';
import { Tabs, Tab, Card, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Category from '../components/Category';

import BuyerProduct from "../components/BuyerProduct";
import SellerProduct from "../components/SellerProduct";
import UserSidebar from "../components/UserSidebar";

import UserContext from "../context/userContext";
import userAPI from "../services/user";

import "../styles/Profile.scss";

function Profile() {
  const { userType, setUserType, userInfo, setUserInfo } = useContext(UserContext);

  const [activeStatus, setActiveStatus] = useState("All");

  useEffect(() => {
    const fetchUserInfo = async () => {
        const userId = localStorage.getItem("id");
        setUserType(localStorage.getItem("userType"))
        if (userId) {
            userAPI.getProfile(userId).then(data => {
                if (data) {
                    setUserInfo(data);
                }
            })
        }
    };

    fetchUserInfo();
}, [setUserInfo]);
     
  const orders = [
    { name: "Basic T-shirt", price: "₫70.000", shopName: "Ahau19LsyTanShop's", status: "Received", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "SamSung Fridge", price: "₫4.300.000", shopName: "Danhuyshop's", status: "Confirming", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "4 floors Bookcase", price: "₫230.000", shopName: "floorshop's", status: "Received", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "San Kyo Fan", price: "₫149.000", shopName: "Ahau19LsyTanShop's", status: "Confirming", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "Basic T-shirt abc", price: "₫70.000", shopName: "Ahau19LsyTanShop's", status: "Received", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "SamSung Fridge abc", price: "₫4.300.000", shopName: "Danhuyshop's", status: "Received", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "4 floors Bookcase abc", price: "₫230.000", shopName: "floorshop's", status: "Shipping", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "San Kyo Fan abc", price: "₫149.000", shopName: "Ahau19LsyTanShop's", status: "Received", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "Tên hàng 5", price: "₫300.000", shopName: "shop5's", status: "Shipping", image: "http://localhost:3000/mockData/product.jpg" },
  ];

  const orders2 = [
    { name: "Basic T-shirt", price: "₫70.000", shopName: "Ahau19LsyTanShop's", status: "Pending Approval", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "SamSung Fridge", price: "₫4.300.000", shopName: "Danhuyshop's", status: "Purchased", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "4 floors Bookcase", price: "₫230.000", shopName: "floorshop's", status: "Pending Approval", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "San Kyo Fan", price: "₫149.000", shopName: "Ahau19LsyTanShop's", status: "Purchased", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "Basic T-shirt abc", price: "₫70.000", shopName: "Ahau19LsyTanShop's", status: "Not Purchased", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "SamSung Fridge abc", price: "₫4.300.000", shopName: "Danhuyshop's", status: "Not Purchased", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "4 floors Bookcase abc", price: "₫230.000", shopName: "floorshop's", status: "Not Purchased", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "San Kyo Fan abc", price: "₫149.000", shopName: "Ahau19LsyTanShop's", status: "Shipping", image: "http://localhost:3000/mockData/product.jpg" },
    { name: "Tên hàng 5", price: "₫300.000", shopName: "shop5's", status: "Shipping", image: "http://localhost:3000/mockData/product.jpg" },
  ];

  const filteredOrders = activeStatus === "All" ? orders : orders.filter(order => order.status === activeStatus);
  const filteredOrders2 = activeStatus === "All" ? orders2 : orders2.filter(order => order.status === activeStatus);

  return (
    <div className="main-container">
      <Header />
      <div className="category-container">
        <Category />
      </div>
      
      <div className="profile-page-container">
      
        <div className="profile-sidebar">
          <UserSidebar />
        </div>

        <div className="profile-content">

        {userType === "buyer" && (
          <>
            <Tabs activeKey={activeStatus} onSelect={(k) => setActiveStatus(k)} className="tabs mb-3">
              <Tab eventKey="All" title="All" />
              <Tab eventKey="Confirming" title="Confirming" />
              <Tab eventKey="Shipping" title="Shipping" />
              <Tab eventKey="Received" title="Received" />
              <Tab eventKey="Canceled" title="Canceled" />
            </Tabs>
           <BuyerProduct orders={filteredOrders} />
          </>
        )}
        {userType === "seller" && (
          <>
            <Tabs activeKey={activeStatus} onSelect={(k) => setActiveStatus(k)} className="tabs mb-3">
              <Tab eventKey="All" title="All" />
              <Tab eventKey="Pending Approval" title="Pending Approval" />
              <Tab eventKey="Not Purchased" title="Not Purchased" />
              <Tab eventKey="Shipping" title="Shipping" />
              <Tab eventKey="Purchased" title="Purchased" />
            </Tabs>
           <SellerProduct orders={filteredOrders2} />
          </>
        )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;