import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/ProductDetail.scss";
import Footer from "../components/Footer";

import UserContext from "../context/userContext";
import productAPI from "../services/product";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await productAPI.getProductById(id);
        if (response.success) {
            setProduct(response.product);
        } else {
            console.error(response.message);
        } 
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found.</div>;
  const handleCancel = () => {
        navigate(-1);
  };

  return (
    <div className="main-container">
      <Header />

      <div className="information">Information</div>
      <div className="add-image">
        <div className="add-image-header">Images</div>
        <div className="images">
            {product.images.map((image, index) => (
              <div className="image-item"><img key={index} src={image} alt={`Product ${index}`} /></div>
            ))}
        </div>          
      </div>
      <div className="product-detail-attributes">
      <div className="product-detail-attribute">
        <div className="attribute-head">Name</div>
        <div className="display">{product.productName}</div>
      </div>
      <div className="product-detail-attribute">
        <div className="attribute-head">Cost</div>
        <div className="display">{product.price}</div>
      </div>
      <div className="product-detail-attribute">
        <div className="attribute-head">Address</div>
        <div className="display">{product.address}</div>
      </div>
      <div className="product-detail-attribute">
        <div className="attribute-head">Category</div>
        <div className="display">
          {" "}
          {product.categoryIDs.map((category) => category.categoryName).join(", ")}
        </div>
      </div>
      <div className="product-detail-attribute">
        <div className="attribute-head">Description</div>
        <div className="display">{product.description}</div>
      </div>

      <div className="button-choice">
        <button className="back-button" onClick={() => handleCancel()}>Back</button>
      </div>
      </div>
      
      <Footer showBanner={false} />
    </div>
  );
}

export default ProductDetail;
