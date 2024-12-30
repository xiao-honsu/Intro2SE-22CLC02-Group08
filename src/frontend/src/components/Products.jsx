import React from "react";
import { useNavigate } from "react-router-dom";

const Products = ({ products }) => {
    const navigate = useNavigate();

    const handleNavigate = (product) => {
        navigate("/UnapprovedDetail", { state: { product } }); 
    };

    return (
        <section className="products">
            {products.map((product, index) => (
                <div
                    className="post-item"
                    role="button"
                    key={product._id || index} 
                    onClick={() => handleNavigate(product)} 
                >
                    <div className="post-profile">
                    <img
                        src={product.sellerID?.avatar || "default-avatar.jpg"} 
                        className="avt"
                        alt="Seller Avatar"
                    />
                    <h6>{product.sellerID?.username || "Unknown Seller"}</h6>
                    </div>
                    

                    <div className="post-details">
                    <img
                        src={product.images?.[0] || "default-product.jpg"} 
                        className="prtImg"
                        alt="Product"
                    />
                        <div className="post-details-text">
                        <p>Product name: {product.productName || "Unnamed Product"}</p>
                        <p>Price: {`${product.price.toLocaleString()} VND`}</p>
                        <p>Description: {product.description || "No description available"}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Products;
