import React, { useState } from 'react';
import { Card, Form, Button, Alert } from "react-bootstrap";
import authAPI from "../services/auth";
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PasswordRecovery.scss';

function PasswordRecoveryPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handlePasswordRecovery = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await authAPI.forgotPassword({ email });
            if (res.success) {
                setMessage("A new password has been sent to your email.");
            } else {
                setError(res.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error("Error during password recovery:", error);
            setError("An error occurred.");
        }
    };

    return (
        <div className="main-container">
            <Header showSearch={false} showNav={false} />
            <div className="pass-recover-container">
                <Card className="pass-recover-card">
                    <Card.Body>
                        <h3 className="pass-recover-title">Forgot Password</h3>
                        <Form onSubmit={handlePasswordRecovery}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant="warning" className="pass-recover-button">
                                Reset Password
                            </Button>
                        </Form>
                        {message && <Alert variant="success" className="mt-3">{message}</Alert>}
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        <p className="login-text">
                            Go to Login page <a href="/login">Log in</a>
                        </p>
                    </Card.Body>
                </Card>
            </div>
            <Footer showBanner={false} />
        </div>
    );
}

export default PasswordRecoveryPage;
