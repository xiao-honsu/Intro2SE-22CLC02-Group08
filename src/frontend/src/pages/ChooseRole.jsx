import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ChooseRole.scss'

import UserContext from "../context/userContext"; 
import authAPI from "../services/auth";
import userAPI from "../services/user";

function ChooseRolePage () {
    const { setUserType } = useContext(UserContext);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRoleSelect = async (role) => {
        const id = localStorage.getItem("id"); 
        
        if (!id) {
            console.error("User ID not found. Please log in again.");
            return;
        }
        try {
            const response = await authAPI.choose_role({ id, role });
            if (response.success) {
                setUserType(role);
                localStorage.setItem("userType", role);

                const userInfo = await userAPI.getProfile(id);
                if (userInfo.success) {
                    setUserInfo(userInfo);  
                } else {
                    console.error("Failed to fetch user info.");
                }

                if (role === "buyer") {
                    navigate("/HomePageBuyer");
                } else if (role === "seller") {
                    navigate("/HomePageSeller");
                }
            } else {
                console.error("Failed to update role:", response.message);
            }
        } catch (error) {
            console.error("Error updating role:", error);
        }
    }
    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header showSearch={false} showNav={false}  />
            </div>
            <div className="choose-role-container">
                <Card className="choose-role-card">
                    <Card.Body>
                        <h3 className="choose-role-title">Choose role</h3>      
                            <Button variant="warning" className="buyer-button" onClick={() => handleRoleSelect("buyer")}>Buyer</Button>
                            <Button variant="warning" className="seller-button" onClick={() => handleRoleSelect("seller")}>Seller</Button>
                        
                    </Card.Body>
                </Card>
            </div>
            <Footer showBanner={ false }/>
        </div>
    );
}

export default ChooseRolePage;
