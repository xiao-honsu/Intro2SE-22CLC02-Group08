import React, { useContext, useEffect } from 'react';
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


function HomePageSeller() {
  const { userType, setUserType } = useContext(UserContext);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const dummyProducts = Array(16).fill({  // tạo tạm trước khi có sb
    image: '/mostSearch-laptop.jpg', 
    name: 'Tên đồ', 
    price: 'Giá tiền', 
  });

  useEffect(() => {
    const stored_userType = localStorage.getItem("userType");
    if (stored_userType) {
      setUserType(stored_userType);
    }
  }, [setUserType]);

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
          <RecentPostedSeller />
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

export default HomePageSeller;
