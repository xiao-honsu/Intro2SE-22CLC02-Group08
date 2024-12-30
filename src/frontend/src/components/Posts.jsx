import React from "react";

const Posts = ({ posts }) => {
  return (
    <section className="posts">
      {posts.map((post) => (
        <div className="post-item" key={post._id}>
          <div className="post-profile">
          <img
            src={post.sellerID.avatar} 
            className="avt"
            alt="User Avatar"
          />
          <h6>{post.sellerID.username}</h6> 
          </div>
          

          <div className="post-details">
          <img
            src={post.images[0]} 
            className="prtImg"
            alt="Product"
          />
          <div className="post-details-text">
            <p>Product name: {post.productName}</p>
            <p>Price: {post.price.toLocaleString()} VND</p> 
            <p>Description: {post.description}</p>
          </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Posts;
