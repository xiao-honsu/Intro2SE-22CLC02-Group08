import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Category from '../components/Category';

import ProductCartItem from "../components/ProductCartItem";

import Footer from '../components/Footer';
import UserContext from "../context/userContext";
import productAPI from '../services/product';

import '../styles/SearchResult.scss';

function SearchResult() {
    const { search } = useLocation();
    const [keyword, setKeyword] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(search);
        const keywordParam = params.get('keyword');

        if (keywordParam) {
            setKeyword(keywordParam);
            const fetchProducts = async () => {
                try {
                    const response = await productAPI.searchProduct(keywordParam);
                    if (response.success) {
                        setProducts(response.products);
                    } else {
                        console.error(response.message);
                    }
                } catch (error) {
                    console.error("error fetching search result:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [search]);
    if (loading) return <div>Loading...</div>;
    if (!products.length) return <div>No products found</div>

    return (
        <div className="main-container">
            <Header />
            <div className="home-container">
                <Category />

                <div className="product-list-container">
                    <h2 className="product-list-title">Search results for keyword '{keyword}'</h2>
                    <div className="cart-container">
                        <div className="cart-items">
                        {products.map((product) => (
                            <ProductCartItem 
                                key={product._id}
                                product={product}
                            />
                        ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default SearchResult;
