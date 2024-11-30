import React, { useContext, useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import UserContext from "../context/userContext";
import userAPI from "../services/user";

import "../styles/UserSidebar.scss"
const UserSidebar = () => {
    const { userType, setUserType, userInfo, setUserInfo } = useContext(UserContext);

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

    return (
        <div className="user-sidebar">
            <div className="user-avatar">
                <img src={userInfo.profileImage} alt="avatar" />
            </div>
            <div className="user-info">
                <h4> {userInfo.username || "username" } </h4>
                <p>Joined on: {userInfo.signupDate} </p>
                {userType === "seller" && (
                    <>
                        <p> Sold: {userInfo.numItems} items </p>
                        <p> Rating: {userInfo.rating} </p>
                    </>
                )}
            </div>

            <div className="edit-profile-button">
                <Button variant="link" >
                    <FontAwesomeIcon icon={faPencilAlt} /> edit profile
                </Button>
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