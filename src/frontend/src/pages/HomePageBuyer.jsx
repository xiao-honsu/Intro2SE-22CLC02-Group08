import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Category from '../components/Category';
import Banner from '../components/Banner';
import MostSearchedItems from '../components/MostSearchedItem';
import ProductCard from '../components/ProductCard';
import About from '../components/About';
import Footer from '../components/Footer';
import UserContext from "../context/userContext";
import userAPI from "../services/user";

import '../styles/HomePageBuyer.scss';

import productAPI from '../services/product';

function HomePageBuyer() {
  const { userType, setUserType, userInfo, setUserInfo } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userId = localStorage.getItem("id");
        const stored_userType = localStorage.getItem("userType");

        if (userId) {
          const data = await userAPI.getProfile(userId);
          if (data.success) {
            setUserInfo(data);
          } else {
            console.error("Failed to fetch user info");
          }
        }

        if (stored_userType) {
          setUserType(stored_userType);
        }


        const productResponse = await productAPI.getAllProductsNotPurchased();
        if (productResponse.success) {
          setProducts(productResponse.products); 
        } else {
          console.error(productResponse.message);
        }
      } catch (error) {
        console.error("Error during initial data fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [setUserType, setUserInfo]);

  return (
    <div className="main-container">
    
    
        <Header />
    

    
      <div className="home-container">
        <Category />

        <Banner userType={userType} />

        <div className="homepage-buyer-most-searched-container">
          <MostSearchedItems />
        </div>

        <div className="product-list-container">
          <h2 className="product-list-title">Recently Posted</h2>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.images[0] || "/product-placeholder.png"}
                name={product.productName}
                price={product.price}
              />
            ))}
          </div>
        </div>

    <About />
    <Footer />
      </div>
    </div>
  );
}

export default HomePageBuyer;
