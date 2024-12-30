import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Category from '../components/Category';
import Banner from '../components/Banner';
import MostSearchedItems from '../components/MostSearchedItem';
import ProductCard from '../components/ProductCard';
import About from '../components/About';
import Footer from '../components/Footer';
import RecentPostedSeller from '../components/RecentPostedSeller';
import UserContext from "../context/userContext";
import '../styles/HomePage.scss';
import productAPI from '../services/product';
import userAPI from "../services/user";

function HomePageSeller() {
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

        <div className="homepageseller-most-searched-container">
          <MostSearchedItems />
        </div>

        <div className="homepageseller-recent-posted-container">
  {userInfo && userInfo.userId ? (
    <RecentPostedSeller userID={userInfo.userId} />
  ) : (
    <p></p> 
  )}
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

export default HomePageSeller;
