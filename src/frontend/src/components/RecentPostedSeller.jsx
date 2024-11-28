import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../styles/RecentPostedSeller.scss'; 

function RecentPostedSeller() {
  const items = [
    { 
      title: 'Basic T-shirt', 
      price: '79 000 ₫', 
      status: 'Not sold', 
      image: '/RecentPostedSeller-Tshirt.png' 
    },
    { 
      title: 'OstroVit Thermos flask', 
      price: '56 000 ₫', 
      status: 'Not sold', 
      image: '/RecentPostedSeller-bottle.png' 
    },
  ];

  return (
    <div className="RecentPostedSeller-container">
      <h2 className="RecentPostedSeller-title">Your Recently Posted</h2>
      <div className="RecentPostedSeller-content">
        {items.map((item, index) => (
          <div key={index} className="RecentPostedSeller-section">
            <Card className="RecentPostedSeller-card">
              <Card.Img variant="top" src={item.image} className="RecentPostedSeller-img" />
              <Card.Body>
                <Card.Title className="RecentPostedSeller-title-text">{item.title}</Card.Title>
                <p className="RecentPostedSeller-price">{item.price}</p>
                <p className="RecentPostedSeller-status">{item.status}</p>
                <div className="RecentPostedSeller-button-wrapper">
                  <Button variant="dark" className="RecentPostedSeller-details-btn">
                    Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="sell-all-seller-wrapper">
                <a href="">See all</a>
        </div>
    </div>
  );
}

export default RecentPostedSeller;
