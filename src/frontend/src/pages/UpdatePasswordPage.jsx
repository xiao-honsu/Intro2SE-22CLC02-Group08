import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';
import authAPI from "../services/auth";
import '../styles/SignUp.scss'

function UpdatePasswordPage() {
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match!");
            return;
        }

        try {
            const res = await authAPI.updatePassword({ email, currentPassword, newPassword });

            if (res.success) {
                setMessage("Password updated successfully!");
                setTimeout(() => navigate("/login"), 1500); // Chuyển về trang đăng nhập sau khi đổi mật khẩu thành công
            } else {
                setError(res.message || "Failed to update password.");
            }
        } catch (error) {
            console.error("Update password error:", error);
            setError("An error occurred during password update.");
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
                        <h3 className="signup-title">Update Password</h3>
                        <Form onSubmit={handleUpdatePassword}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCurrentPassword" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Current password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formNewPassword" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant="warning" className="signup-button">Update Password</Button>
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

export default UpdatePasswordPage;
