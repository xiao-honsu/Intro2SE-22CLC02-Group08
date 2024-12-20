import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Payment.scss";

import orderAPI from "../services/order";
import productAPI from "../services/product";
import UserContext from "../context/userContext";

const Payment = () => {
    const navigate = useNavigate();
    const { productID } = useParams();
    const { userInfo } = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        bank: "",
        bankAccount: "",
    });
  
    const [paymentMethod, setPaymentMethod] = useState(""); 
    const [sellerBankInfo, setSellerBankInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const response = await productAPI.getProductById(productID);
                if (response.success) {
                    const product = response.product;
                    setSellerBankInfo({
                        bank: product.sellerID.bank,
                        bankAccount: product.sellerID.bankAccount,
                    });
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error("Error fetching product info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductInfo();
    }, [productID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
  
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };
  
    const handleCancel = () => {
        setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
            bank: "",
            bankAccount: "",
        });
        setPaymentMethod("");
        navigate(-1);
    };
  
    const handleConfirm = async () => {
        const uploadData = {
            productID,
            buyerID: userInfo.userId,
            receiverName: formData.name,
            receiverPhoneNumber: formData.phone,
            receiverEmail: formData.email,
            address: formData.address,
            paymentMethod,
            bank: paymentMethod === "Banking" ? formData.bank : null,
            bankAccount: paymentMethod === "Banking" ? formData.bankAccount : null,
        };
        try {
            const response = await orderAPI.createOrder(uploadData);
            if (response.success) {
                alert("Order created successfully!");
                navigate(-1);
            } else {
                alert(response.message || "Failed to create order.");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("An error occurred while creating the order.");
        }
    };    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-container">
            <Header />
            <div className="information-container">
                <h2>Payment</h2>
                <div className="form-section">
                    <label> Name
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </label>
                    <label> Phone Number
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </label>
                    <label> Email
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </label>
                    <label> Address
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                    </label>
                </div>

                <div className="payment-method">
                    <h3>Payment Method</h3>
                    <div className="payment-options">
                        <button className={`payment-button ${paymentMethod === "COD" ? "active" : ""}`}
                            onClick={() => handlePaymentMethodChange("COD")}>
                              COD
                        </button>
                        <button className={`payment-button ${paymentMethod === "Banking" ? "active" : ""}`}
                            onClick={() => handlePaymentMethodChange("Banking")}>
                              Banking
                        </button>
                    </div>
                </div>

                {paymentMethod === "Banking" && (
                    <div className="banking-section">
                        <div className="seller-bank-info">
                            <p><strong>Seller's Bank:</strong> {sellerBankInfo.bank}</p>
                            <p><strong>Seller's Bank Account:</strong> {sellerBankInfo.bankAccount}</p>
                        </div>

                        <label> Bank
                            <input type="text" name="bank" value={formData.bank} onChange={handleInputChange} />
                        </label>
                        <label> Bank Account
                            <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} />
                        </label>
                    </div>
                )}

                <div className="button-section">
                    <button className="cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="confirm-button" onClick={handleConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
            <Footer showBanner={false} />
        </div>
    );
};

export default Payment;
