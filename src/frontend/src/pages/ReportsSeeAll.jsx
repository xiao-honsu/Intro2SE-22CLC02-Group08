import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Reports from "../components/Reports";
import '../styles/HomePageAdmin.scss';
import reportAPI from '../services/report'; 

function ReportsSeeAll() {
    const [userType, setUserType] = useState('admin');
    const [reports, setReports] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await reportAPI.getAllReport();
                if (response.success) {
                    setReports(response.reports || []); 
                } else {
                    console.error('Lỗi khi lấy báo cáo:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchReports();
    }, []); 

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
            </div>
            <div className="reports">
                <div className="reports-text">
                    Reports
                </div>
                <div className="inner-reports">
                    <div className="inner-report-header">
                        <div className="inner-report-header-name">
                            Reported person's name
                        </div>
                        <div className="inner-report-header-email">
                            Email
                        </div>
                        <div className="inner-report-header-prtName">
                            Reported product's name
                        </div>
                        <div className="inner-report-header-des">
                            Description
                        </div>
                    </div>
                    {/* Truyền danh sách báo cáo vào component Reports */}
                    <Reports reports={reports} />
                </div>
            </div>
        </div>
    );
}

export default ReportsSeeAll;
