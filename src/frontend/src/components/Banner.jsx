import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/Banner.scss';

function Banner({ userType }) {
  
  const getBannerContent = () => {
    switch (userType) {
      case "guest":
        return {
          title: "Welcome to t2hands",
          subtitle: "find your perfect deal",
          description: "Sign up to explore the best second-hand items.",
          buttonText: "SHOP NOW",
        };
      case "seller":
        return {
          title: "Start Selling Today",
          subtitle: "Turn your items into cash",
          description: "List your items and reach thousands of buyers.",
          buttonText: "SELL NOW",
        };
      case 'buyer':
        return {
          title: "Discover Great Deals",
          subtitle: "Shop Second-Hand Smartly",
          description: "Find high-quality items at unbeatable prices.",
          buttonText: "SHOP NOW",
        };
      
      default:
        return {
          title: "Welcome to t2hands",
          subtitle: "Find your perfect deal",
          description: "Sign up to explore the best second-hand items.",
          buttonText: "SHOP NOW",
        };
    }
  };

  const bannerContent = getBannerContent();

  return (
    <div className="banner-container">
      {/* nội dung cố định khi banner thay đổi */}
      <div className="banner-overlay">
        <h1 className="banner-title">{bannerContent.title}</h1>
        <h2 className="banner-subtitle">{bannerContent.subtitle}</h2>
        <p className="banner-description">{bannerContent.description}</p>
        <button className="banner-button">{bannerContent.buttonText}</button>
      </div>

    
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
             src="/banner1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
             src="/banner2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
             src="/banner3.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
             src="/banner4.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Banner;
