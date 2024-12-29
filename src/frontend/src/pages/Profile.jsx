import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Tabs, Tab, Card, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Category from '../components/Category';

import BuyerProduct from "../components/BuyerProduct";
import SellerProduct from "../components/SellerProduct";
import UserSidebar from "../components/UserSidebar";
import Help from '../components/Help';

import UserContext from "../context/userContext";
import userAPI from "../services/user";
import productAPI from '../services/product';
import orderAPI from '../services/order';
import feedbackAPI from '../services/feedback';


import "../styles/Profile.scss";

function Profile() {
    const { id } = useParams();
    const { userType, setUserType, userInfo, setUserInfo } = useContext(UserContext);
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [profileInfo, setProfileInfo] = useState(null);

    const [orders1, setOrders1] = useState([]);
    const [orders2, setOrders2] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [activeStatus, setActiveStatus] = useState("All");

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem("id");
            setUserType(localStorage.getItem("userType"));
    
            if (id === userId) {
                setIsMyProfile(true);
                setProfileInfo(userInfo);
            } else {
                setIsMyProfile(false);
                const data = await userAPI.getProfile(id);
                if (data) {
                    data.role = "seller";
                    setProfileInfo(data);
                }
            }
            console.log(profileInfo);
        };
    
        fetchUserInfo();
    }, [id, userInfo, setUserType]); 
    
    useEffect(() => {
        const fetchAdditionalData = async () => {
            if (profileInfo && (profileInfo.role === "seller" || !isMyProfile)) {
                const productRes = await productAPI.getProductsBySeller(profileInfo.userId);
                if (productRes.success) {
                    setOrders2(productRes.products);
                } else {
                    console.log("Fail to fetch seller products:", productRes.message);
                }
            }
    
            if (profileInfo && isMyProfile && profileInfo.role === "buyer") {
                const orderRes = await orderAPI.getOrdersByBuyer(profileInfo.userId);
                if (orderRes.success) {
                    setOrders1(orderRes.orders);
                } else {
                    console.log("fail to fetch order");
                }
            }
        };
    
        fetchAdditionalData();
    }, [profileInfo, isMyProfile]); 
    
     
    const refreshOrders = async () => {
        const orderRes = await orderAPI.getOrdersByBuyer(profileInfo.userId);
        if (orderRes.success) {
            setOrders1(orderRes.orders); 
        } else {
            console.log("Failed to refresh orders:", orderRes.message);
        }
    };

    const refreshProduct = async () => {
        const productRes = await productAPI.getProductsBySeller(profileInfo.userId);
        if (productRes.success) {
            setOrders2(productRes.products); 
        } else {
            console.log("Failed to refresh products:", productRes.message);
        }
    };

    
    const filteredOrders1 = activeStatus === "All" ? orders1 : orders1.filter(order => order.status === activeStatus);
    const filteredOrders2 = activeStatus === "All" ? orders2 : orders2.filter(order => order.status === activeStatus);

    useEffect(() => {
        const fetchFeedback = async () => {
            if (profileInfo && profileInfo.role === "seller") {
                const feedbackRes = await feedbackAPI.getFeedbackBySeller(profileInfo.userId);
                if (feedbackRes.success) {
                    setFeedbacks(feedbackRes.feedbacks);
                } else {
                    console.log("Failed to fetch feedback:", feedbackRes.message);
                }
            }
        };
        fetchFeedback();
    }, [profileInfo]);

    return (
        <div className="main-container">
            <Header />
            <div className="category-container">
                <Category />
            </div>
            <div className="profile-page-container">
                <div className="profile-sidebar">
                    <UserSidebar profileInfo={profileInfo} isMyProfile={isMyProfile} />
                </div>
                <div className="profile-content">
                {isMyProfile && profileInfo && profileInfo.role === "buyer" && (
                    <>
                        <Tabs activeKey={activeStatus} onSelect={(k) => setActiveStatus(k)} className="tabs mb-3">
                            <Tab eventKey="All" title="All" />
                            <Tab eventKey="Confirming" title="Confirming" />
                            <Tab eventKey="Shipping" title="Shipping" />
                            <Tab eventKey="Received" title="Received" />
                            <Tab eventKey="Canceled" title="Canceled" />
                        </Tabs>
                        <BuyerProduct orders={filteredOrders1} onOrdersChange={refreshOrders} />
                        
                    </> 
                )}
                {isMyProfile && profileInfo && profileInfo.role === "seller" && (
                    <>
                        <Tabs activeKey={activeStatus} onSelect={(k) => setActiveStatus(k)} className="tabs mb-3">
                            <Tab eventKey="All" title="All" />
                            <Tab eventKey="Pending Approval" title="Pending Approval" />
                            <Tab eventKey="Not Purchased" title="Not Purchased" />
                            <Tab eventKey="To Confirm" title="To Confirm" />
                            <Tab eventKey="Shipping" title="Shipping" />
                            <Tab eventKey="Purchased" title="Purchased" />
                        </Tabs>
                        <SellerProduct list_orders={filteredOrders2} isMyProfile={isMyProfile} onProductsChange={refreshProduct} />
                        
                    </>
                )}

                {!isMyProfile && profileInfo && (
                    <>
                        <Tabs activeKey="Not Purchased" className="tabs mb-3">
                            <Tab eventKey="Not Purchased" title="Not Purchased" />
                        </Tabs>
                        <SellerProduct list_orders={filteredOrders2.filter(order => order.status === "Not Purchased")} 
                            isMyProfile={isMyProfile} />
                        <Help />
                    </>
                )}

                {profileInfo && profileInfo.role === "seller" && (
                    <>
                        <div className="feedback-section">
                            <h3>Feedback</h3>
                            {feedbacks.length > 0 ? (
                                feedbacks.map((feedback) => (
                                    <Card key={feedback._id} className="mb-3">
                                        <Card.Body>
                                            <div className="d-flex align-items-center">
                                                <img src={feedback.buyerID.avatar || "/default-avatar.png"} alt="avatar" className="avatar"
                                                    style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "15px" }} />
                                                <div>
                                                    <h5>{feedback.buyerID.username}</h5>
                                                    <p>{feedback.comment}</p>
                                                    <div className="rating">
                                                        {"★".repeat(Math.floor(feedback.rating))}
                                                        {feedback.rating % 1 ? "½" : ""}
                                                    </div>
                                                    <small className="text-muted">{new Date(feedback.feedbackDate).toLocaleDateString()}</small>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No feedback</p>
                            )}
                    </div>
                </>
            )}
                </div>
            </div>

            
            <Footer />
        </div>
    );
}

export default Profile;