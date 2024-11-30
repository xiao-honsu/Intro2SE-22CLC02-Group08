import React, { useState } from "react";
import Header from "../components/Header";
import "../styles/ProductDetail.scss";
import Footer from "../components/Footer";
  
function ProductDetail() {
  const [userType, setUserType] = useState("seller");
  return (
    <div className="main-container">
      <div className="header-wrapper">
        <Header userType={userType} />
      </div>

      <div className="information">Information</div>
      <div className="add-image">
        <div className="add-image-header">Images</div>
        <div className="images">
            <div className="image-item"><img src="ipod-preview-1.jpg" alt="Image 1" /></div>
            <div className="image-item"><img src="ipod-preview-2.jpg" alt="Image 2" /></div>
            <div className="image-item"><img src="ipod-preview-3.jpg" alt="Image 3" /></div>
            <div className="image-item"><img src="ipod-preview-4.jpg" alt="Image 4" /></div>
        </div>          
      </div>
      <div className="name-product">
        <div className="name-product-head">Name</div>
        <div className="display-name">iPod</div>
      </div>
      <div className="cost">
        <div className="cost-head">Cost</div>
        <div className="display-cost">125000</div>
      </div>
      <div className="address">
        <div className="address-head">Address</div>
        <div className="display-address">District 3, Ho Chi Minh City</div>
      </div>
      <div className="category">
        <div className="category-head">Category</div>
        <div className="display-category">Electronics</div>
      </div>
      <div className="description">
        <div className="description-head">Description</div>
        <div className="display-description">I've had this iPod Classic for about a year now. It's definitely a well-loved device, but it still works great! While it's not brand new, it's been well-maintained and has plenty of life left in it.</div>
      </div>
      <div className="button-choice">
        <button className="back-button">Back</button>
      </div>
      <Footer showBanner={false} />
    </div>
  );
}

export default ProductDetail;
