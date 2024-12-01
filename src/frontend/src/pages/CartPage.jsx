import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCartItem from "../components/ProductCartItem";

import "../styles/CartPage.scss";

const CartPage = () => {
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      seller: {
        avatar: "http://localhost:3000/mockData/avt4.jpg",
        name: "LsyTan Shop's",
        rating: "4.5",
      },
      image: "http://localhost:3000/mockData/product.jpg",
      name: "Basic T-shirt",
      price: "₫70.000",
    },
    {
      id: 2,
      seller: {
        avatar: "http://localhost:3000/mockData/avt4.jpg",
        name: "SamSung Store",
        rating: "4.8",
      },
      image: "http://localhost:3000/mockData/product.jpg",
      name: "Samsung",
      price: "₫4.300.000",
    },
    {
      id: 3,
      seller: {
        avatar: "http://localhost:3000/mockData/avt4.jpg",
        name: "Furniture House",
        rating: "4.6",
      },
      image: "http://localhost:3000/mockData/product.jpg",
      name: "Tủ đứng",
      price: "₫230.000",
    },
    {
      id: 4,
      seller: {
        avatar: "http://localhost:3000/mockData/avt4.jpg",
        name: "San Kyo Shop",
        rating: "4.3",
      },
      image: "http://localhost:3000/mockData/product.jpg",
      name: "San Kyo",
      price: "₫149.000",
    },
  ]);

  return (
    <div className="main-container">
        <Header />
      

      
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <ProductCartItem key={index} product={item} />
          ))}
        </div>
      </div>

     
      <Footer showBanner={true} />
    </div>
  );
};

export default CartPage;
