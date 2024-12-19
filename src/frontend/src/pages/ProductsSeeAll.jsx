import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Products from "../components/Products";
import { Link } from "react-router-dom";
import '../styles/HomePageAdmin.scss';
import productAPI from '../services/product'; // Import API service

function ProductsSeeAll() {
    const [userType, setUserType] = useState('admin');
    const [products, setProducts] = useState([]); // Lưu trữ danh sách sản phẩm
    const [loading, setLoading] = useState(true); // Trạng thái loading

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await productAPI.getAllProductsPending();
                if (response.success) {
                    setProducts(response.products || []); // Lưu danh sách sản phẩm
                } else {
                    console.error('Lỗi khi lấy sản phẩm:', response.message);
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            } finally {
                setLoading(false); // Dừng loading sau khi hoàn thành
            }
        };

        fetchData();
    }, []); // useEffect chỉ chạy khi component mount

    if (loading) {
        return <div>Loading...</div>;
    }

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
                    {/* Truyền danh sách sản phẩm vào component Products */}
                    <Products products={products} />
                </div>
            </div>
        </div>
    );
}

export default ProductsSeeAll;
