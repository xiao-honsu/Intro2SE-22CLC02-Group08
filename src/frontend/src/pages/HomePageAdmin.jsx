import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Stats from "../components/Stats";
import Posts from "../components/Posts";
import Products from "../components/Products";
import Reports from "../components/Reports";
import { Link } from "react-router-dom";
import '../styles/HomePageAdmin.scss';
import productAPI from '../services/product'; 
import reportAPI from '../services/report'; 
import statisticsAPI from '../services/statistics';


function HomePageAdmin() {
    const [userType] = useState('admin');
    const [products, setProducts] = useState([]);
    const [reports, setReports] = useState([]);  
    const [todayPosts, setTodayPosts] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await productAPI.getAllProductsPending();
                if (productResponse.success) {
                    setProducts(productResponse.products || []);
                } else {
                    console.error('Failed to fetch products:', productResponse.message);
                }

                const reportResponse = await reportAPI.getAllReport();
                if (reportResponse.success) {
                    setReports(reportResponse.reports || []);
                } else {
                    console.error('Failed to fetch reports:', reportResponse.message);
                }

                const todayPostsResponse = await productAPI.getProductsUpdatedToday();
                if (todayPostsResponse.success) {
                    setTodayPosts(todayPostsResponse.products || []);
                } else {
                    console.error('Failed to fetch today posts:', todayPostsResponse.message);
                }
                console.log(todayPostsResponse.products);
                const statisticsResponse = await statisticsAPI.getStatistics();
                if (statisticsResponse.success) {
                    setStatistics(statisticsResponse.statistics); 
                } else {
                    console.error('Không thể lấy thống kê:', statisticsResponse.message);
                }

            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Lấy tối đa 3 sản phẩm đầu tiên
    const productsToShow = products.slice(0, 3);
    const reportsToShow = reports.slice(0, 3);
    const todayPostsToShow = todayPosts.slice(0, 3);
    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
            </div>
            {statistics && (
                <Stats 
                    totalUsers={statistics.totalUsers} 
                    totalVisitToday={statistics.totalVisitToday} 
                    currentVisitors={statistics.currentVisitors}
                />
            )}
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
                    <Posts posts={todayPostsToShow} />
                    <Link to="/PostsSeeAll">See All</Link>
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
                    {/* Truyền danh sách sản phẩm có tối đa 3 sản phẩm vào component Products */}
                    <Products products={productsToShow} />
                    <Link to="/ProductsSeeAll">See All</Link>
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
                    <Reports reports={reportsToShow} />
                    <Link to="/ReportsSeeAll">See All</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePageAdmin;
