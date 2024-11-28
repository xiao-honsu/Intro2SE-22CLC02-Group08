import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import "../styles/UserSidebar.scss"
const UserSidebar = ({ userType, userInfo }) => {
    return (
        <div className="user-sidebar">
            <div className="user-avatar">
                <img src={userInfo.avatar || "/default_avatar.jpg"} alt="avatar" />
            </div>
            <div className="user-info">
                <h4> {userInfo.name || "username" } </h4>
                <p>Joined on: {userInfo.joinDate} </p>
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