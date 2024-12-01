import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/Payment.scss";

const EditProfile = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      bank: "",
      bankAccount: "",
    });
  
    const [paymentMethod, setPaymentMethod] = useState(""); 
  
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
  
    const handleConfirm = () => {
      console.log("Saved Data:", formData);
      alert("Information saved!");
    };

    const sellerBankInfo = {
        bank: "ABC Bank",
        bankAccount: "123-456-789",
      };

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

export default EditProfile;
