import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import UserContext from "../context/userContext";
import userAPI from "../services/user";

import "../styles/UserSidebar.scss"

const UserSidebar = () => {
    const { userType, setUserType, userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const [activeStatus, setActiveStatus] = useState("all");
  
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

    const handleEditProfile = () => {
        navigate("/EditProfile");
    }

    return (
        <div>
        <div className="user-sidebar">
            <div className="user-avatar">
                {userInfo.avatar ? (  
                    <img src={userInfo.avatar} alt="Avatar" style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} />
                ) : (
                    <FontAwesomeIcon icon={faUser} />
                )}
            </div>
            <div className="user-info">
                <h4> {userInfo.username || "username" } </h4>
                <p>Joined on: { new Date(userInfo.signupDate).toLocaleDateString() } </p>
                {userType === "seller" && (
                    <>
                        <p> Sold: {userInfo.numItems} items </p>
                        <p> Rating: {userInfo.rating} </p>
                    </>
                )}
            </div>

            <div className="edit-profile-button">
                <Button variant="link" onClick={handleEditProfile}>
                    <FontAwesomeIcon icon={faPencilAlt} /> edit profile
                </Button>
            </div>

            
        </div>
            {userType === "seller" && (
                <div className="add-product-button">
                    <Button variant="warning">
                        Add Product
                    </Button>
                </div>
            )}   
        </div>
    );
};

export default UserSidebar;