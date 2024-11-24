import React, { useState } from 'react';
import { Card, Form, Button } from "react-bootstrap";
import Header from '../components/Header';
import '../styles/ChooseRole.scss'
import { Link } from 'react-router-dom';
function ChooseRolePage () {
    const userType = "guest";
    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} showSearch={false} showNav={false}  />
            </div>
            <div className="choose-role-container">
                <Card className="choose-role-card">
                    <Card.Body>
                        <h3 className="choose-role-title">Choose role</h3>
                        <Form>
                            <Link to="/HomePageBuyer">
                                <Button variant="warning" className="buyer-button">Buyer</Button>
                            </Link>
                            <Link to="/HomePageSeller">
                                <Button variant="warning" className="seller-button">Seller</Button>
                            </Link>
                        </Form>
                        <hr />
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default ChooseRolePage;
