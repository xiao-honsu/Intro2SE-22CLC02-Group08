import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/EditProfile.scss";

import UserContext from "../context/userContext";
import userAPI from "../services/user";

const EditProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: "",
    username: "",
    bank: "",
    bankAccount: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        avatar: userInfo.avatar || "",
        username: userInfo.username || "",
        bank: userInfo.bank || "",
        bankAccount: userInfo.bankAccount || "",
      });
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result});
      }
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    navigate(`/Profile/${userInfo.userId}`);
  };

  const handleSave = async () => {
    try {
      const res = await userAPI.updateProfile(userInfo.userId, formData);
        
        if (!res) {
            console.error("Failed to update profile: Response is null");
            alert("Failed to update profile. Please try again.");
            return;
        }

        if (res.success) {
            alert("Profile updated successfully!");
            setUserInfo(res.updatedUser); 
            navigate(`/Profile/${userInfo.userId}`);
        } else {
            alert(response.message || "Failed to update profile");
        }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="main-container">
      <Header />

    <div className="information-container">
      <h2>Information</h2>
      <div className="profile-image-section">
        <label className="image-upload-label">
          <input type="file" accept="image/*" onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <div className="image-upload-box">
            {formData.avatar ? (
              <img src={formData.avatar} alt="Profile" className="uploaded-image" />
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
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
        </label>
        <label>
          Bank
          <input type="text" name="bank" value={formData.bank} onChange={handleInputChange} />
        </label>
        <label>
          Bank Account
          <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} />
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
