import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

import "../styles/SellerUploadProduct.scss";

import UserContext from "../context/userContext";
import productAPI from "../services/product";
import categoryAPI from "../services/category";

function ImageUploader({ onImagesChange }) {
    const [images, setImages] = useState([]);
    const maxImages = 5;

    const handleFileChange = (e) => {
        const fileList = Array.from(e.target.files);
        const newImages = fileList.slice(0, maxImages - images.length);
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onImagesChange(updatedImages);
    };

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onImagesChange(updatedImages);
    };

    return (
        <div className="image-uploader-container">
            <div className="image-list">
                {images.map((img, idx) => (
                    <div key={idx} className="image-item">
                        <img src={URL.createObjectURL(img)} alt={`uploaded-${idx}`} className="uploaded-image" />
                        <button className="remove-btn" onClick={() => removeImage(idx)} title="Remove image">
                          ✕
                        </button>
                    </div>
                ))}
                {images.length < maxImages && (
                    <label htmlFor="imageUpload" className="upload-box">
                        <div className="icon">
                            <FontAwesomeIcon icon={faImages} size="3x" />
                        </div>
                        <input id="imageUpload" type="file" accept="image/*" multiple className="hidden-input" onChange={handleFileChange} />
                    </label>
                )}
            </div>
            <p className="image-count">{`${images.length}/${maxImages} images`}</p>
        </div>
    );
}

function DropdownMultiple({ categories, onCategorySelect }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategoryNames, setSelectedCategoryNames] = useState([]); 

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev); 
    };
    const handleSelect = (category) => {
        const { _id, categoryName } = category;
        setSelectedCategories((prev) =>
            prev.includes(_id)
                ? prev.filter((id) => id !== _id)
                : [...prev, _id]
        );
        setSelectedCategoryNames((prev) =>
            prev.includes(categoryName)
                ? prev.filter((name) => name !== categoryName)
                : [...prev, categoryName]
        );
        
    };
    

    useEffect(() => {
        onCategorySelect(selectedCategories);
    }, [selectedCategories, onCategorySelect]);

    return (
        <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedCategoryNames.length > 0 ? selectedCategoryNames.join(", ") : "Select Categories"}
                <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
            </div>
            {isOpen && (
                <ul className={`dropdown-menu ${isOpen ? "open" : ""}`}>
                    {categories.map((category) => (
                        <li key={category._id} className="dropdown-item">
                            <label>
                                <input type="checkbox" checked={selectedCategories.includes(category._id)}
                                onChange={() => handleSelect(category)}
                                />
                                {category.categoryName}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}



function SellerUploadProduct() {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    };
    const { userInfo } = useContext(UserContext);
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        address: "",
        description: "",
        categoryIDs: [],
        images: [],
        sellerID: userInfo?.userId || "",
    });

    const [categories, setCategories] = useState([]); 
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await categoryAPI.getCategories();
            if (response.success) {
                setCategories(response.categories);
            } else {
                console.error("Failed to fetch categories:", response.message);
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImagesChange = (images) => {
        setFormData({ ...formData, images });
    };

    const handleCategorySelect = useCallback((selected) => {
        setFormData((prev) => ({ ...prev, categoryIDs: selected }));
    }, []);

    const handleUpload = async () => {
        const uploadData = new FormData();
        console.log("formData: ", formData);
        formData.images.forEach((file) => uploadData.append("images", file));
        uploadData.append("productName", formData.productName);
        uploadData.append("price", formData.price);
        uploadData.append("address", formData.address);
        uploadData.append("description", formData.description);
        uploadData.append("categoryIDs", JSON.stringify(formData.categoryIDs));
        uploadData.append("sellerID", formData.sellerID);

        try {
            const response = await productAPI.createProduct(uploadData);
            if (response.success) {
                alert("Product uploaded successfully!");
                navigate("/profile");
            } else {
                alert("Failed to upload product!");
            }
        } catch (error) {
            console.error("Error uploading product:", error);
            alert("Error occurred while uploading product.");
        }
    };

    return (
        <div className="main-container">
            <Header />

              <div className="information">Upload Product</div>

            <div className="add-image">
                <div className="add-image-header">Add Images</div>
                <ImageUploader onImagesChange={handleImagesChange} />
            </div>

            <div className="form-fields">
                <div>
                    <input type="text" name="productName" placeholder="Product Name" onChange={handleInputChange} className="input-container"/>
                </div>
                <div>
                    <input type="number" name="price" placeholder="Price" onChange={handleInputChange} className="input-container" />
                </div>
                <div>
                    <textarea name="address" placeholder="Address" onChange={handleInputChange} className="input-container"/>
                </div>
                <div>
                    <textarea name="description" placeholder="Description" onChange={handleInputChange} className="input-container" />
                </div>
            </div>

            <div className="category">
                <div className="category-head">Category</div>
                <DropdownMultiple categories={categories} onCategorySelect={handleCategorySelect} />
            </div>


            <div className="button-choice">
                <button className="delete-button" onClick={handleCancel}>Delete</button>
                <button className="upload-button" onClick={handleUpload}>Upload</button>
            </div>

            <Footer showBanner={false} />
        </div>
    );
}

export default SellerUploadProduct;
