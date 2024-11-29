import React, { useState } from 'react';
import Header from '../components/Header';
import Products from "../components/Products";
import { Link } from "react-router-dom";
import '../styles/HomePageAdmin.scss';

function ProductsSeeAll() {
    const [userType, setUserType] = useState('admin');

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
            </div>
            <div className="unapproved-products">
                <div className="unapproved-products-text">
                    Unapproved Products
                </div>
                <div className="inner-unapproved-products">
                    <div className="inner-header">
                        <div className="inner-header-name">
                            Name
                        </div>
                        <div className="inner-header-product">
                            Product
                        </div>
                    </div>
                    <Products />
                </div>
            </div>
        </div>
    );
}

export default ProductsSeeAll;