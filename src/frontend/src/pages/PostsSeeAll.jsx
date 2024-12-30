import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Posts from "../components/Posts"; // Import component Posts
import { Link } from "react-router-dom";
import '../styles/HomePageAdmin.scss';
import productAPI from '../services/product'; // Import API service

function PostsSeeAll() {
    const [userType, setUserType] = useState('admin');
    const [posts, setPosts] = useState([]); // Lưu trữ danh sách bài đăng
    const [loading, setLoading] = useState(true); // Trạng thái loading

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await productAPI.getProductsUpdatedToday(); // Hoặc API khác
                if (response.success) {
                    setPosts(response.products || []); // Lưu danh sách bài đăng
                } else {
                    console.error('Lỗi khi lấy bài đăng:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            } finally {
                setLoading(false); // Dừng loading sau khi hoàn thành
            }
        };

        fetchPosts();
    }, []); // useEffect chỉ chạy khi component mount

    if (loading) {
        return <div>Loading...</div>;
    }

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
                    {/* Truyền danh sách bài đăng vào component Posts */}
                    <Posts posts={posts} />
                </div>
            </div>
        </div>
    );
}

export default PostsSeeAll;
