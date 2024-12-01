import React, { useContext } from 'react';
import Header from '../components/Header';
import Nav from 'react-bootstrap/Nav';
import Banner from '../components/Banner';
import MostSearchedItems from '../components/MostSearchedItem';
import ProductCard from '../components/ProductCard';
import About from '../components/About';
import UserContext from "../context/userContext";

import { Link } from "react-router-dom";

import Footer from '../components/Footer';


import '../styles/HomePage.scss';

function HomePage() {
  const { userType } = useContext(UserContext);

  const dummyProducts = Array(16).fill({  // tạo tạm trước khi có sb
    id: '1',
    image: '/mostSearch-laptop.jpg', 
    name: 'Tên đồ', 
    price: 'Giá tiền', 
  });

  return (
    <div className="main-container">
        <Header />
    

      <div className="home-container">
        <Nav className="category-nav">
          <Nav.Item className="nav-item">
            <Nav.Link href="/women">Women</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link href="/men">Men</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link href="/kids">Kids</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link href="/electronics">Electronics</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link href="/books">Books</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link href="/bags">Bags</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link href="/office">Office</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link href="/tools">Tools</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link href="/all">All</Nav.Link>
          </Nav.Item>
        </Nav>

        <Banner userType={userType} />

        <div className="homepage-most-searched-container">
          <MostSearchedItems />
        </div>

        <div className="product-list-container">
          <h2 className="product-list-title">Recently Posted</h2>
          <div className="product-grid">
            {dummyProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
               
              />
            ))}
          </div>
        </div>
        
        <div className="recommendation-banner">
      <h2 className="recommendation-text">See personalized recommendations</h2>
      <Link to='/login'>
        <button className="sign-in-button">Sign in</button>
      </Link>
      <p className="new-customer-text">
        New customer? <a href="/SignUp" className="start-here-link">Start here!</a>
      </p>
    </div>

    <About />

    <Footer />

      </div>
    </div>
  );
}

export default HomePage;
