import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import productAPI from '../services/product'; // Import API service
import '../styles/UnapprovedDetail.scss';

function UnapprovedDetail() {
    const [userType, setUserType] = useState('admin');
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Lấy thông tin từ state
    const [product, setProduct] = useState(location.state?.product || null); // Lấy sản phẩm từ state
    const navigate = useNavigate(); // Dùng để điều hướng về trang trước

    useEffect(() => {
        if (!product) {
            // Nếu không có sản phẩm trong state, có thể gọi API để lấy dữ liệu
            const fetchProductDetails = async () => {
                try {
                    const response = await productAPI.getProductById(productId); // Giả sử bạn có productId
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
            setLoading(false); // Nếu có sản phẩm trong state thì không cần gọi API
        }
    }, [product, location.state?.product]); // Nếu state thay đổi thì gọi lại

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
                alert('Sản phẩm đã được phê duyệt và cập nhật trạng thái thành công.');
                // Quay lại trang ProductsSeeAll
                navigate('/ProductsSeeAll');
            } else {
                alert('Đã có lỗi xảy ra khi cập nhật trạng thái sản phẩm.');
            }
        } catch (error) {
            console.error('Lỗi khi phê duyệt sản phẩm:', error);
            alert('Lỗi khi phê duyệt sản phẩm.');
        }
    };

    // Hàm xử lý khi nhấn "Decline"
    const handleDecline = async () => {
        try {
            const response = await productAPI.deleteProduct(product._id); // Xóa sản phẩm
            if (response.success) {
                alert('Sản phẩm đã bị từ chối và xóa khỏi hệ thống.');
                navigate('/ProductsSeeAll'); // Quay lại trang ProductsSeeAll
            } else {
                alert('Đã có lỗi xảy ra khi từ chối và xóa sản phẩm.');
            }
        } catch (error) {
            console.error('Lỗi khi từ chối và xóa sản phẩm:', error);
            alert('Lỗi khi từ chối và xóa sản phẩm.');
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
