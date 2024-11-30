import React from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate("/UnapprovedDetail"); 
    };
    return (
      <section className="products">
        <div className="post-item" role="button"  onClick={handleNavigate}>
          <img src="avt1.jpg" className="avt" alt="Post" />
          <h6>bocchi</h6>
          <img src="mostSearch-bag.jpg" className="prtImg" alt="Post" />
          <div className="post-details">
            <p>blabla</p>
            <p>300,000</p>
            <p>Description: Lorem ipsum dolor sit amet...</p>
          </div>  
        </div>
        <div className="post-item" role="button" onClick={handleNavigate}>
          <img src="avt1.jpg" className="avt" alt="Post" />
          <h6>bocchi</h6>
          <img src="mostSearch-bag.jpg" className="prtImg" alt="Post" />
          <div className="post-details">
            <p>blabla</p>
            <p>300,000</p>
            <p>Description: Lorem ipsum dolor sit amet...</p>
          </div>  
        </div>
      </section>
    );
  };
  
  export default Products;
  