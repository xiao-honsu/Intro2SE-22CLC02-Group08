import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserContext from "../context/userContext";
import '../styles/SignUp.scss'

import authAPI from "../services/auth";

function SignUpPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const res = await authAPI.signup({ email, password });

            if (res.success) {
                setMessage("Sign up succesful!");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setMessage(res.message || "Fail");
            }
        } catch (error) {
            console.error("Sign up error:", error);
            setMessage("An error occurred during sign up.");
        }
    };

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header showSearch={false} showNav={false}  />
            </div>
            <div className="signup-container">
                <Card className="signup-card">
                    <Card.Body>
                        <h3 className="signup-title">Sign Up</h3>
                        <Form onSubmit={handleSignUp}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control type="email" placeholder="Your email" className="signup-input" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </Form.Group>        
                           <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Control type="password" placeholder="Your password" className="signup-input" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </Form.Group> 
                            <Form.Group controlId="formVerifyPassword" className="mb-3">
                                <Form.Control type="password" placeholder="Verify your password" className="signup-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                            </Form.Group> 
                            
                                <Button type="submit" variant="warning" className="signup-button">Sign up</Button>
                           
                        </Form>
                        {message && <p className="text-center mt-3" style={{ color: 'white' }}>{message}</p>}
                        <hr />
                        <p className="login-text">
                        Already have an account? <Link to="/login">Log in</Link>
                        </p>
                        <hr />
                    </Card.Body>
                </Card>
            </div>
            <Footer showBanner={ false }/>
        </div>
    );
}

export default SignUpPage;
