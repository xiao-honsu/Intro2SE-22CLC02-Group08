import React, { useContext, useState, useEffect } from 'react';
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

import productAPI from '../services/product';

function HomePage() {
  const { userType } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProductsNotPurchased();
        if (response.success) {
          setProducts(response.products);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>No products available at the moment.</div>;


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
