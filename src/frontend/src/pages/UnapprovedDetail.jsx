import React, { useState } from 'react';
import Header from '../components/Header';
import Posts from "../components/Posts";
import { Link } from "react-router-dom";
import '../styles/UnapprovedDetail.scss';

function UnapprovedDetail() {
    const [userType, setUserType] = useState('admin');

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
            </div>
            <div className="body">
                <div className="box">
                    <div className="unapproved-item">
                        <img src="avt1.jpg" className="avt" alt="Post" />
                        <h6>Dog Tuong</h6>
                        <div className="item-details">
                            <img src="mostSearch-bag.jpg" className="prtImg" alt="Post" />
                            <p>blabla</p>
                            <p>300,000</p>
                            <p>Description: Lorem ipsum dolor sit amet...</p>
                        </div>  
                    </div>
                    <div className="button-area">
                        <div className="approve" role="button">
                            Approve
                        </div>
                        <div className="decline" role="button">
                            Decline
                        </div>
                        <div className="back" role="button">
                            Back
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UnapprovedDetail;