import React, { useState, useContext } from 'react';    
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Toast, ToastContainer } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';

import UserContext from "../context/userContext";
import authAPI from "../services/auth";
import adminAPI from "../services/admin";

import '../styles/Login.scss'

function LoginPage() {
    const { setUserType } = useContext(UserContext);
    const { userInfo, setUserInfo } = useContext(UserContext); // dung cho admin (mac du la "user")
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", variant: "" });

    const handleLogin = async () => {
        const loginData = { email, password };
        try {
            const res = await authAPI.login(loginData);

            if (res.success) {
                setToast({ show: true, message: `Logged in as ${res.userType}`, variant: "success" });
                setUserType(res.userType);
                localStorage.setItem("id", res.id);
                localStorage.setItem("userType", res.userType);

                console.log("id: ", localStorage.getItem("id"));
                console.log("type: ", localStorage.getItem("userType"));

                // Điều hướng dựa trên userType
                if (res.userType === "admin") {
                    const userInfo = await adminAPI.getProfile(localStorage.getItem("id")); // Gọi API lấy thông tin admin
                    if (userInfo.success) {
                        setUserInfo(userInfo);  // Lưu thông tin admin vào context
                        console.log(userInfo);
                    } else {
                        console.error("Failed to fetch user info.");
                    }
                    navigate("/HomePageAdmin");
                }
                    
                
                else if (res.userType === "user") 
                    navigate("/ChooseRole");
                
            } else {
                setToast({ show: true, message: res.message || "Invalid email or password!", variant: "danger" });
            }
        } catch (err) {
            setToast({ show: true, message: "An error occurred. Please try again.", variant: "danger" });
            console.error(err);
        } 
    };

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header showSearch={false} showNav={false} />
            </div>
            <div className="login-container">
                <Card className="login-card">
                    <Card.Body>
                        <h3 className="login-title">Login</h3>
                        <Form>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control type="email" placeholder="Your email" className="login-input" value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                />
                            </Form.Group>        
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Control type="password" placeholder="Your password" className="login-input" value={password} 
                                    onChange={e => setPassword(e.target.value)} 
                                />
                            </Form.Group> 
                            
                            <Button variant="warning" className="login-button" onClick={handleLogin}>Login</Button>
                        </Form>

                        <hr />
                        <p className="signup-text">
                            Don't have an account? <a href="/signup">Sign Up</a>
                        </p>
                        <hr />
                        <p className="signup-text">
                            Forgot password? <a href="/PasswordRecovery">Reset password</a>
                        </p>

                        <p className="signup-text">
                        Change your password? <a href="/update-password">Update Password</a>
                        </p>

                    </Card.Body>
                </Card>
            </div>
            <Footer showBanner={false} />
            <ToastContainer position="bottom-end" className="p-3">
                <Toast bg={toast.variant} onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={3000} autohide>
                    <Toast.Body className="text-white">{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}

export default LoginPage;
