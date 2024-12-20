import React, { useRef } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import '../styles/MostSearchedItem.scss'; 

import { useNavigate } from "react-router-dom";

function MostSearchedItems() {
  const navigate = useNavigate();
  const rowRef = useRef(null); 

  const items = [
    { title: 'Dress', image: '/mostSearch-dress.jpg' },
    { title: 'Kitchenware', image: '/mostSearch-kitchenware.jpg' },
    { title: 'Phone', image: '/mostSearch-phone.jpg' },
    { title: 'Book', image: '/mostSearch-book.jpg' },
    { title: 'Laptop', image: '/mostSearch-laptop.jpg' },
    { title: 'Watch', image: '/mostSearch-watch.jpg' },
    { title: 'Shoes', image: '/mostSearch-shoes.jpg' },
    { title: 'Bag', image: '/mostSearch-bag.jpg' },
  ];

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = 300; 
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="most-searched-container">
      <h2 className="most-searched-title">Most Searched Items</h2>
      <div className="most-searched-row-wrapper" ref={rowRef}>
        <Row className="most-searched-row">
          {items.map((item, index) => (
            <Col key={index} className="most-searched-col">
              <Card className="most-searched-card">
                <Card.Img variant="top" src={item.image} className="most-searched-img" />
                <Card.Body>
                  <Card.Title className="most-searched-title-text">
                    <Button onClick={() => navigate(`/search?keyword=${encodeURIComponent(item.title)}`)} className="btnMostSearch"> {item.title} </Button>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      
      <button
        className="arrow-btn left-arrow"
        onClick={() => handleScroll("left")}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </button>
      <button
        className="arrow-btn right-arrow"
        onClick={() => handleScroll("right")}
      >
        <FontAwesomeIcon icon={faArrowRight} size="lg" />
      </button>
    </div>
  );
}

export default MostSearchedItems;
