import React, { useState } from 'react';
import Header from '../components/Header';
import Nav from 'react-bootstrap/Nav';
import Footer from '../components/Footer';
import '../styles/SupportPageSeller.scss';

function SellerUploadProduct() {
    const [userType, setUserType] = useState("seller");
    return (
        <div className="main-container">

            <div className="header-wrapper">
            <Header userType={userType} />
            </div>

            <Nav className="category-nav">
            <Nav.Item className="nav-item">
                <Nav.Link href="/women">Women</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/men">Men</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/kids">Kids</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/electronics">Electronics</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/books">Books</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/bags">Bags</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/office">Office</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/tools">Tools</Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-item">
                <Nav.Link href="/all">All</Nav.Link>
            </Nav.Item>
            </Nav>
            
            <Footer />
        </div>
    );
}

export default SellerUploadProduct;