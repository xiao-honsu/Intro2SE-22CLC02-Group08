import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import Header from '../components/Header';
import '../styles/SignUp.scss'
function SignUpPage () {
    const userType = "guest";
    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} showSearch={false} showNav={false}  />
            </div>
            <div className="signup-container">
                <Card className="signup-card">
                    <Card.Body>
                        <h3 className="signup-title">Sign Up</h3>
                        <Form>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control type="email" placeholder="Your email" className="signup-input" />
                            </Form.Group>        
                           <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Control type="password" placeholder="Your password" className="signup-input" />
                            </Form.Group> 
                            <Form.Group controlId="formVerifyPassword" className="mb-3">
                                <Form.Control type="password" placeholder="Verify your password" className="signup-input" />
                            </Form.Group> 
                            <Link to="/login">
                                <Button variant="warning" className="signup-button">Sign up</Button>
                            </Link>
                        </Form>
                        <hr />
                        <p className="login-text">
                        Already have an account? <a href="/login">Log in</a>
                        </p>
                        <hr />
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default SignUpPage;
