import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/SellerUploadProduct.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

function ImageUploader() {
  const [images, setImages] = useState([]);
  const maxImages = 5;

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    const newImages = fileList.slice(0, maxImages - images.length);
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="image-uploader-container">
      <div className="image-list">
        {images.map((img, idx) => (
          <div key={idx} className="image-item">
            <img
              src={URL.createObjectURL(img)}
              alt={`uploaded-${idx}`}
              className="uploaded-image"
            />
            <button
              className="remove-btn"
              onClick={() => removeImage(idx)}
              title="Remove image"
            >
              ✕
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <label htmlFor="imageUpload" className="upload-box">
            <div className="icon">
              <span role="img" aria-label="add image">
                <FontAwesomeIcon icon={faImages} size="3x" />
              </span>
            </div>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              className="hidden-input"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
      <p className="image-count">{`${images.length}/${maxImages} images`}</p>
    </div>
  );
}

function Dropdown() {
    const [categories] = useState(["Women", "Men", "Kids", "Home", "Electronics", "Books", "Bags", "Office", "Tools"]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev); // Đảo trạng thái dropdown
    };
  
    const handleSelect = (category) => {
      setSelectedCategory(category);
      setIsOpen(false); // Đóng dropdown sau khi chọn
    };
  
    return (
      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleDropdown}>
          {selectedCategory}
          <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
        </div>
        {isOpen && (
        <ul className={`dropdown-menu ${isOpen ? "open" : ""}`}>
            {categories.map((category, index) => (
            <li
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(category)}
            >
                {category}
            </li>
            ))}
        </ul>
        )}
      </div>
    );
  }
  
function SellerUploadProduct() {
  const [userType, setUserType] = useState("seller");
  return (
    <div className="main-container">
      <div className="header-wrapper">
        <Header userType={userType} />
      </div>

      <div className="information">Information</div>
      <div className="add-image">
        <div className="add-image-header">Add image</div>
        <ImageUploader />
      </div>
      <div className="name-product">
        <div className="name-product-head">Name product</div>
        <textarea className="input-name" />
      </div>
      <div className="cost">
        <div className="cost-head">Cost</div>
        <input type="text" className="input-cost" />
      </div>
      <div className="address">
        <div className="address-head">Address</div>
        <textarea className="input-address" />
      </div>
      <div className="category">
        <div className="category-head">Category</div>
        <Dropdown />
      </div>
      <div className="description">
        <div className="description-head">Description</div>
        <textarea className="input-description" />
      </div>
      <div className="button-choice">
        <button className="delete-button">Delete</button>
        <button className="upload-button">Upload</button>
      </div>
      <Footer showBanner={false} />
    </div>
  );
}

export default SellerUploadProduct;
