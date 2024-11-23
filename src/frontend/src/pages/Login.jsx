import React, { useState } from 'react';
import { Card, Form, Button } from "react-bootstrap";
import Header from '../components/Header';
import '../styles/Login.scss'
function LoginPage () {
    const userType = "guest";
    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} showSearch={false} showNav={false}  />
            </div>
            <div className="login-container">
                <Card className="login-card">
                    <Card.Body>
                        <h3 className="login-title">Login</h3>
                        <Form>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control type="email" placeholder="Your email" className="login-input" />
                            </Form.Group>        
                           <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Control type="password" placeholder="Your password" className="login-input" />
                            </Form.Group> 
                            <Button variant="warning" className="login-button">Login</Button>
                        </Form>

                        <hr />
                        <p className="signup-text">
                        Don't have an account? <a href="/signup">Sign Up</a>
                        </p>
                        <hr />
                        <p className="signup-text">
                        Forgot password? <a href="">Reset password</a>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default LoginPage;
