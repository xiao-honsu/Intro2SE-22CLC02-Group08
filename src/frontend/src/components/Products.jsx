import React from "react";


const Products = () => {
    return (
      <section className="products">
        <div className="post-item" role="button">
          <img src="avt1.jpg" className="avt" alt="Post" />
          <h6>Dog Tuong</h6>
          <img src="mostSearch-bag.jpg" className="prtImg" alt="Post" />
          <div className="post-details">
            <p>blabla</p>
            <p>300,000</p>
            <p>Description: Lorem ipsum dolor sit amet...</p>
          </div>  
        </div>
        <div className="post-item" role="button">
          <img src="avt1.jpg" className="avt" alt="Post" />
          <h6>Dog Tuong</h6>
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
  