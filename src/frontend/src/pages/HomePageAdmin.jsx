import React, { useState } from 'react';
import Header from '../components/Header';
import Stats from "../components/Stats";
import Posts from "../components/Posts";
import Products from "../components/Products";
import Reports from "../components/Reports";
import { Link } from "react-router-dom";
import '../styles/HomePageAdmin.scss';

function HomePageAdmin() {
    const [userType, setUserType] = useState('admin');

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
            </div>
            <Stats />
            <div className="today-post">
                <div className="today-post-text">
                    Today's Posts
                </div>  
                <div className="inner-today-post">
                    <div className="inner-header">
                        <div className="inner-header-name">
                            Name
                        </div>
                        <div className="inner-header-product">
                            Product
                        </div>
                    </div>
                    <Posts />
                    <a href="/PostsSeeAll" >See All</a>
                </div>
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
                    <a href="/ProductsSeeAll" >See All</a>
                </div>
            </div>
            <div className="reports">
                <div className="reports-text">
                    Report
                </div>
                <div className="inner-reports">
                    <div className="inner-report-header">
                        <div className="inner-report-header-name">
                            Reported person's name
                        </div>
                        <div className="inner-report-header-psid">
                            Reported person's id
                        </div>
                        <div className="inner-report-header-prtid">
                            Reported product's id
                        </div>
                        <div className="inner-report-header-des">
                            Description
                        </div>
                    </div>
                    <Reports />
                    <a href="/ReportsSeeAll" >See All</a>
                </div>
            </div>
        </div>
    );
}

export default HomePageAdmin;