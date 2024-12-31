import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping, faUser, faBell, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import BellWithDot from "./BellWithDot";
import Chat from './Chat';
import ChatAdmin from './ChatAdmin';
import Notification from "./Notification";

import UserContext from "../context/userContext";
import userAPI from "../services/user";
import adminAPI from "../services/admin";
import adminNotificationAPI from "../services/adminNotification";
import notificationAPI from "../services/notification";

import accessHistoryAPI from "../services/accessHistory";

import "../styles/Header.scss";

function Header({ showSearch = true, showNav = true }) {
    const { userType, setUserType, userInfo, setUserInfo } = useContext(UserContext);

    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            if (userInfo?.userId || userInfo?.adminId) {
                let response;
                if (userInfo.role === "buyer" || userInfo.role === "seller") {
                    response = await notificationAPI.getNotification(userInfo.userId, userInfo.role);
                } else if (userInfo.role === "admin") {
                    response = await adminNotificationAPI.getNotification(userInfo.adminId, userInfo.role);
                }
                if (response.success) {
                    setNotifications(response.notifications);               
                    const unreadExists = response.notifications.some((noti) => !noti.isRead);
                    setHasUnread(unreadExists);
                }
            }
        };
        fetchNotifications();
    }, [userInfo?.userId, userInfo?.adminId, userInfo?.role]);

    const handleMarkAsRead = async (notificationID) => {
        let response;
        if (userInfo.role === "buyer" || userInfo.role === "seller") {
            response = await notificationAPI.markAsRead(notificationID);
        } else if (userInfo.role === "admin") {
            response = await adminNotificationAPI.markAsRead(notificationID);
        }
        if (response.success) {
            setNotifications((prevNotifications) =>
                prevNotifications.map((noti) =>
                    noti._id === notificationID ? { ...noti, isRead: true } : noti
                )
            );
            const unreadExists = notifications.some((noti) => noti._id !== notificationID && !noti.isRead);
            setHasUnread(unreadExists);
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };
    const handleSearch = () => {
        if (searchKeyword.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
        } else {
            alert("Please enter a keyword to search");
        }
    };


    useEffect(() => {
        const fetchUserInfo = async () => {
            if (userType === "admin") {
                const userId = localStorage.getItem("id");
                setUserType(localStorage.getItem("userType"))
                if (userId && userId.trim() !== "") {
                    adminAPI.getProfile(userId).then(data => {
                        if (data) {
                            setUserInfo(data);
                        }
                    })
                } else {
                    setUserType(null);
                    setUserInfo(null);
                }
            }
            else {
                const userId = localStorage.getItem("id");
                setUserType(localStorage.getItem("userType"))
                if (userId && userId.trim() !== "") {
                    userAPI.getProfile(userId).then(data => {
                        if (data) {
                            setUserInfo(data);
                        }
                    })
                } else {
                    setUserType(null);
                    setUserInfo(null);
                }
            }
        };

        fetchUserInfo();
    }, [setUserInfo]);

    const handleLogout = async (event) => {
        event.preventDefault(); 
        console.log("id: ", localStorage.getItem("id"));
        try {
            if (userType === "buyer" || userType === "seller") {
                const response = await accessHistoryAPI.addHistory({
                    userID: userInfo.userId,
                    status: "Logged Out",
                });
    
                if (!response.success) {
                    console.error("Failed to log access history:", response.message);
                }
            }
            localStorage.removeItem("id");
            localStorage.removeItem("userType");
            setUserType(null); 
            setUserInfo(null);
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }   
    };

    const handleToHome = () => {
        if (userType === "admin") navigate("/HomePageAdmin");
        else if (userType === "buyer") navigate("/HomePageBuyer");
        else if (userType === "seller") navigate("/HomePageSeller");
        else navigate("/");
    }

    return (
        <header className="header d-flex align-items-center justify-content-between">
        <div className="header-logo">
            <button className="logo-link" onClick={handleToHome}>
                <h1 className="logo">t2hands</h1>
            </button>
        </div>

        {showSearch && (
            <div className="header-search flex-grow-1 mx-3">
                <Form className="searchBar" onSubmit={(e) => {e.preventDefault(); handleSearch()}}>
                    <FormControl type="search" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search for anything" className="search-input" aria-label="Search" />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </Form>
            </div>
        )}

        
        {showNav && (
        <nav className="header-nav d-flex align-items-center">
            {(userType !== "admin" && userType !== "buyer" && userType !== "seller") && (
                <>
                    <Link to="/login" className="nav-link mx-2">
  Login
</Link>
                    <Link to="/SignUp" className="nav-link mx-2"> Sign Up</Link>
                    <Link to="/login" className="btn btn-warning mx-2">Sell now</Link>
                    <Link to="/CartPage" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>

                    <div className="profile-dropdown">
                        <div className="nav-icon mx-2 profile-icon" onClick={toggleDropdown} style={{ cursor: "pointer" }} >
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/login" className="dropdown-item">Log in</Link>
                            </div>
                        )}
                    </div>
                </>
            )}

            {userType === "seller" && userInfo && (
                <>
                    <Link to="/SellerUploadProduct" className="btn btn-warning mx-2">Sell now</Link>

                    <div className="notification-dropdown">
                        <div className="nav-icon mx-2 noti-icon" onClick={toggleNotification} style={{ cursor: "pointer" }} >
                               <BellWithDot hasUnread={hasUnread} />
                        </div>
                        {isNotificationOpen && (
                            <Notification notifications={notifications} onMarkAsRead={handleMarkAsRead}  />
                        )}
                    </div>

                    <div className="chat-box">
                        <div className="nav-icon mx-2" onClick={toggleChat} style={{ cursor: "pointer" }}>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </div>
                        {isChatOpen && (
                            <Chat userID={userInfo.userId}/>
                        )}
                    </div>

                    <div className="profile-dropdown">
                        <div className="nav-icon mx-2 profile-icon" onClick={toggleDropdown} style={{ cursor: "pointer" }} >
                            {userInfo.avatar ? (  
                                <img src={userInfo.avatar} alt="Avatar" style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} />
                            ) : (
                                <FontAwesomeIcon icon={faUser} />
                            )} 
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to={`/Profile/${userInfo.userId}`} className="dropdown-item">Profile</Link>
                                <Link to="/ChooseRole" className="dropdown-item">Role</Link>
                                <Link to="/" className="dropdown-item" onClick={handleLogout}>Log out</Link>
                            </div>
                        )}
                    </div>
                </>
            )}

            {userType === "buyer" && userInfo && (
                <>
                    <Link to="/CartPage" className="nav-icon mx-2">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>

                    <div className="notification-dropdown">
                        <div className="nav-icon mx-2 noti-icon" onClick={toggleNotification} style={{ cursor: "pointer" }} >
                               <BellWithDot hasUnread={hasUnread} />
                        </div>
                        {isNotificationOpen && (
                            <Notification notifications={notifications} onMarkAsRead={handleMarkAsRead}  />
                        )}
                    </div>

                    <div className="chat-box">
                        <div className="nav-icon mx-2" onClick={toggleChat} style={{ cursor: "pointer" }}>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </div>
                        {isChatOpen && (
                            <Chat userID={userInfo.userId} />
                        )}
                    </div>

                    <div className="profile-dropdown">
                        <div className="nav-icon mx-2 profile-icon" onClick={toggleDropdown} style={{ cursor: "pointer" }} >
                            {userInfo.avatar ? (  
                                <img src={userInfo.avatar} alt="Avatar" style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} />
                            ) : (
                                <FontAwesomeIcon icon={faUser} />
                            )} 
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to={`/Profile/${userInfo.userId}`} className="dropdown-item">Profile</Link>
                                <Link to="/ChooseRole" className="dropdown-item">Role</Link>
                                <Link to="/" className="dropdown-item" onClick={handleLogout}>Log out</Link>
                            </div>
                        )}
                    </div>
                </>
            )}

            {userType === "admin" && (
                <>
                    <div className="notification-dropdown">
                        <div className="nav-icon mx-2 noti-icon" onClick={toggleNotification} style={{ cursor: "pointer" }} >
                               <BellWithDot hasUnread={hasUnread} />
                        </div>
                        {isNotificationOpen && (
                            <Notification notifications={notifications} onMarkAsRead={handleMarkAsRead}  />
                        )}
                    </div>

                    <div className="chat-box">
                        <div className="nav-icon mx-2" onClick={toggleChat} style={{ cursor: "pointer" }}>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </div>
                        {isChatOpen && (
                            <ChatAdmin adminID={userInfo.adminId} />
                        )}
                    </div>

                    <div className="profile-dropdown">
                        <div className="nav-icon mx-2 profile-icon" onClick={toggleDropdown} style={{ cursor: "pointer" }} >
                            {userInfo.avatar ? (  
                                <img src={userInfo.avatar} alt="Avatar" style={{width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} />
                            ) : (
                                <FontAwesomeIcon icon={faUser} />
                            )} 
                        </div>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/login" className="dropdown-item" onClick={handleLogout}>Log out</Link>
                            </div>
                        )}
                    </div>
                </>
            )}


            
        </nav>
        )}
    </header>
  );
}

export default Header;
