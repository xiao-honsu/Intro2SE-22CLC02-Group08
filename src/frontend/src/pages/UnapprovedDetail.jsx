import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import productAPI from '../services/product'; // Import API service
import '../styles/UnapprovedDetail.scss';

function UnapprovedDetail() {
    const [userType, setUserType] = useState('admin');
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!product) {
            const fetchProductDetails = async () => {
                try {
                    const response = await productAPI.getProductById(productId); 
                    if (response.success) {
                        setProduct(response.product);
                    } else {
                        console.error('Không tìm thấy sản phẩm');
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProductDetails();
        } else {
            setLoading(false); 
        }
    }, [product, location.state?.product]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Không tìm thấy sản phẩm này</div>;
    }

    // Hàm xử lý khi nhấn "Approve"
    const handleApprove = async () => {
        try {
            const response = await productAPI.updateProductStatus(product._id, { status: 'Not Purchased' });
            if (response.success) {
                // Hiển thị thông báo thành công
                alert('The product has been approved and the status updated successfully.');
                // Quay lại trang ProductsSeeAll
                navigate('/ProductsSeeAll');
            } else {
                alert('An error occurred while updating the product status.');
            }
        } catch (error) {
            console.error('Lỗi khi phê duyệt sản phẩm:', error);
            alert('Error when approving product.');
        }
    };

    // Hàm xử lý khi nhấn "Decline"
    const handleDecline = async () => {
        try {
            const response = await productAPI.deleteProduct(product._id); // Xóa sản phẩm
            if (response.success) {
                alert('The product has been declined and removed from the system.');
                navigate('/ProductsSeeAll'); // Quay lại trang ProductsSeeAll
            } else {
                alert('An error occurred while declining and deleting the product.');
            }
        } catch (error) {
            console.error('Lỗi khi từ chối và xóa sản phẩm:', error);
            alert('Error when declining and deleting products.');
        }
    };

    // Hàm xử lý khi nhấn "Back"
    const handleBack = () => {
        navigate(-1); // Quay lại trang trước
    };

    return (
        <div className="main-container">
            <div className="header-wrapper">
                <Header userType={userType} />
            </div>
            <div className="body">
                <div className="box">
                    <div className="unapproved-item">
                        <img src={product.sellerID?.avatar || "default-avatar.jpg"} className="avt" alt="Product" />
                        <h6>{product.sellerID?.username || "Unknown Seller"}</h6>
                        <div className="item-details">
                            <img src={product.images?.[0] || "default-product.jpg"} className="prtImg" alt="Product" />
                            <p>Product name: {product.productName}</p>
                            <p>Price: {`${product.price.toLocaleString()} VND`}</p>
                            <p>Description: {product.description}</p>
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="approve" role="button" onClick={handleApprove}>
                            Approve
                        </div>
                        <div className="decline" role="button" onClick={handleDecline}>
                            Decline
                        </div>
                        <div className="back" role="button" onClick={handleBack}>
                            Back
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UnapprovedDetail;
