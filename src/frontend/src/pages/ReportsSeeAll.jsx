import React, { useState } from 'react';
import Header from '../components/Header';
import Reports from "../components/Reports";
import { Link } from "react-router-dom";
import '../styles/HomePageAdmin.scss';

function ReportsSeeAll() {
    const [userType, setUserType] = useState('admin');

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
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
                </div>
            </div>
        </div>
    );
}

export default ReportsSeeAll;