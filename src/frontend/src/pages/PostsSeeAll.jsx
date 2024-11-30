import React, { useState } from 'react';
import Header from '../components/Header';
import Posts from "../components/Posts";
import { Link } from "react-router-dom";
import '../styles/HomePageAdmin.scss';

function PostsSeeAll() {
    const [userType, setUserType] = useState('admin');

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
            </div>
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
                </div>
            </div>
        </div>
    );
}

export default PostsSeeAll;