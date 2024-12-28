import React from "react";
import { useNavigate } from "react-router-dom";

const Products = ({ products }) => {
    const navigate = useNavigate();

    // Hàm chuyển hướng tới trang chi tiết sản phẩm
    const handleNavigate = (product) => {
        navigate("/UnapprovedDetail", { state: { product } }); // Truyền dữ liệu sản phẩm qua state
    };

    return (
        <section className="products">
            {products.map((product, index) => (
                <div
                    className="post-item"
                    role="button"
                    key={product._id || index} // Dùng `product._id` nếu có, nếu không dùng index
                    onClick={() => handleNavigate(product)} // Khi nhấn, chuyển hướng đến trang chi tiết sản phẩm
                >
                    <img
                        src={product.sellerID?.avatar || "default-avatar.jpg"} // Ảnh đại diện người bán
                        className="avt"
                        alt="Seller Avatar"
                    />
                    <h6>{product.sellerID?.username || "Unknown Seller"}</h6>
                    <img
                        src={product.images?.[0] || "default-product.jpg"} // Ảnh sản phẩm
                        className="prtImg"
                        alt="Product"
                    />
                    <div className="post-details">
                        <p>Product name: {product.productName || "Unnamed Product"}</p>
                        <p>Price: {`${product.price.toLocaleString()} VND`}</p>
                        <p>Description: {product.description || "No description available"}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Products;
