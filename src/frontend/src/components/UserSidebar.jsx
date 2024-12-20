import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import UserContext from "../context/userContext";
import userAPI from "../services/user";

import "../styles/UserSidebar.scss"

const UserSidebar = () => {
    const { userType, setUserType, userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [profileInfo, setProfileInfo] = useState(null);
    const [isMyProfile, setIsMyProfile] = useState(false);
  
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem("id");
            setUserType(localStorage.getItem("userType"))
            if (id === userId) {
                setIsMyProfile(true);
                setProfileInfo(userInfo); 
            } else {
                setIsMyProfile(false);

                const userRes = await userAPI.getProfile(id);
                if (userRes) {
                    setProfileInfo(userRes);
                } else {
                    console.error("Failed to fetch profile info");
                }
            }
        };

        fetchUserInfo();
    }, [id, userInfo, setUserType]);

    const handleEditProfile = () => {
        navigate("/EditProfile");
    }

    return (
        <div>
        <div className="user-sidebar">
            <div className="user-avatar">
                {profileInfo && profileInfo.avatar ? (  
                    <img src={profileInfo.avatar} alt="Avatar" style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} />
                ) : (
                    <FontAwesomeIcon icon={faUser} />
                )}
            </div>
            <div className="user-info">
                <h4> {profileInfo ? profileInfo.username : "username" } </h4>
                <p> Joined on:{" "}
                        {profileInfo?.signupDate
                            ? new Date(profileInfo.signupDate).toLocaleDateString()
                            : "Unknown"} </p>
                {profileInfo && profileInfo.role === "seller" && profileInfo && (
                    <>
                        <p> Sold: {profileInfo.numItems} items </p>
                        <p> Rating: {profileInfo.rating} </p>
                    </>
                )}
            </div>
            
            {isMyProfile && (
                <div className="edit-profile-button">
                    <Button variant="link" onClick={handleEditProfile}>
                        <FontAwesomeIcon icon={faPencilAlt} /> edit profile
                    </Button>
                </div>
            )}
            
        </div>
        {profileInfo && profileInfo.role === "seller" && isMyProfile && (
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