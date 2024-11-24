import React, { useState } from 'react';    
import { Link } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import Header from '../components/Header';
import '../styles/PasswordRecovery.scss'
function PasswordRecoveryPage () {
    const userType = "guest";
    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} showSearch={false} showNav={false}  />
            </div>
            <div className="pass-recover-container">
                <Card className="pass-recover-card">
                    <Card.Body>
                        <h3 className="pass-recover-title">Password Recovery</h3>
                        <Form>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control type="email" placeholder="Your email" className="pass-recover-input" />
                            </Form.Group>        
                            <Link to="/login">
                                <Button variant="warning" className="pass-recover-button">Submit</Button>
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

export default PasswordRecoveryPage;
