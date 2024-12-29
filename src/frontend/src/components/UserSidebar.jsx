import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import Chat from './Chat';

import "../styles/UserSidebar.scss"

const UserSidebar = ({ profileInfo, isMyProfile }) => {
    const navigate = useNavigate();
    const [showChatBox, setShowChatBox] = useState(false);
    const [chatSeller, setChatSeller] = useState({ sellerID: null, sellerName: "" });
  
    const handleEditProfile = () => {
        navigate("/EditProfile");
    }

    const handleChatWithSeller = () => {
        setChatSeller({
            sellerID: profileInfo._id,
            sellerName: profileInfo.username,
        });
        setShowChatBox(true);
    };

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
                {profileInfo && profileInfo.role === "seller" && (
                    <>
                        <p> Sold: {profileInfo.numItems || 0} items </p>
                        <p> Rating: {profileInfo.rating || "N/A"} </p>
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
        
        { profileInfo && profileInfo.role === "seller" && !isMyProfile && (
             <div className="add-product-button">
                <Button variant="warning" onClick={handleChatWithSeller}>
                    Chat with Seller
                </Button>
            </div>
        )}
        
        {showChatBox && chatSeller.sellerID && (
                <Chat sellerID={chatSeller.sellerID} sellerName={chatSeller.sellerName} />
        )}
        </div>
    );
};

export default UserSidebar;