import React, { useContext } from 'react';    
import { Link } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserContext from "../context/userContext";
import '../styles/PasswordRecovery.scss'

function PasswordRecoveryPage () {
    const { setUserType } = useContext(UserContext);
    setUserType("guest")

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header showSearch={false} showNav={false}  />
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
            <Footer showBanner={ false }/>
        </div>
    );
}

export default PasswordRecoveryPage;
