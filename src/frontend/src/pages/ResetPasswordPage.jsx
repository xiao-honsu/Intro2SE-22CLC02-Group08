import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';
import authAPI from "../services/auth";

function ResetPasswordPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Lấy token từ query parameter
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const res = await authAPI.resetPassword({ token, newPassword });

            if (res.success) {
                setMessage("Password reset successful!");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setError(res.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error("Reset password error:", error);
            setError("An error occurred during password reset.");
        }
    };

    return (
        <div className="main-container">
            <Header showSearch={false} showNav={false} />
            <div className="reset-password-container">
                <Card className="reset-password-card">
                    <Card.Body>
                        <h3 className="reset-password-title">Reset Password</h3>
                        <Form onSubmit={handleResetPassword}>
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
                            <Button type="submit" variant="warning">Reset Password</Button>
                        </Form>
                        {message && <Alert variant="success">{message}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Card.Body>
                </Card>
            </div>
            <Footer showBanner={false} />
        </div>
    );
}

export default ResetPasswordPage;
