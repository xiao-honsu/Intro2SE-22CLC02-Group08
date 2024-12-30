import React from 'react';
import Nav from 'react-bootstrap/Nav';
import '../styles/Category.scss';
import { useNavigate } from 'react-router-dom';
function Category() {

  const navigate = useNavigate();

  const handleCategoryClick = (keyword) => {
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <Nav className="category-nav">
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('women')}>Women</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('men')}>Men</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('kids')}>Kids</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('home')}>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('electronics')}>Electronics</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('books')}>Books</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('bags')}>Bags</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('office')}>Office</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('tools')}>Tools</Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-item">
            <Nav.Link onClick={() => handleCategoryClick('')}>All</Nav.Link>
          </Nav.Item>
        </Nav>
  );
}

export default Category;
