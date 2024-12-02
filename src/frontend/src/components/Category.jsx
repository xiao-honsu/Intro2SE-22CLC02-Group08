import React from 'react';
import Nav from 'react-bootstrap/Nav';
import '../styles/Category.scss';

function Category() {
  return (
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
  );
}

export default Category;
