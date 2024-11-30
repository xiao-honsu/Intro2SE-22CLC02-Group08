import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/EditProfile.scss";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    profileImage: null,
    username: "",
    bank: "",
    bankAccount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleCancel = () => {
    setFormData({
      profileImage: null,
      username: "",
      bank: "",
      bankAccount: "",
    });
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Information saved!");
  };

  return (
    <div className="main-container">
      <Header />

    <div className="information-container">
      <h2>Information</h2>
      <div className="profile-image-section">
        <label className="image-upload-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <div className="image-upload-box">
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="uploaded-image"
              />
            ) : (
              <div className="placeholder">
                <span>+</span>
                <p>Add image profile</p>
              </div>
            )}
          </div>
        </label>
      </div>

      <div className="form-section">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Bank
          <input
            type="text"
            name="bank"
            value={formData.bank}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Bank Account
          <input
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="button-section">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>

    <Footer showBanner={false} />
    </div>
  );
};

export default EditProfile;
