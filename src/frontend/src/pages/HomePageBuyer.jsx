import React, { useContext, useEffect } from 'react';
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

function HomePageBuyer() {
  const { userType, setUserType, userInfo, setUserInfo } = useContext(UserContext);

  const dummyProducts = Array(16).fill({  // tạo tạm trước khi có sb
    image: '/mostSearch-laptop.jpg', 
    name: 'Tên đồ', 
    price: 'Giá tiền', 
  });

  useEffect(() => {
    const userId = localStorage.getItem("id");  

    if (userId) {
      userAPI.getProfile(userId).then(data => {
        if (data.success) {
          setUserInfo(data);  
        } else {
          console.error("Failed to fetch user info");
        }
      });
    }

    const stored_userType = localStorage.getItem("userType");
    if (stored_userType) {
      setUserType(stored_userType);
    }

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
            {dummyProducts.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                name={product.name}
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
