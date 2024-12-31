import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import '../styles/RecentPostedSeller.scss';
import productAPI from '../services/product'; 

function RecentPostedSeller({ userID }) {
  const [recentItems, setRecentItems] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await productAPI.getRecentProductsBySeller(userID, 2);
        if (response.success) {
          setRecentItems(response.products); 
        } else {
          console.error("Failed to fetch recent items:", response.message);
        }
      } catch (error) {
        console.error("Error fetching recent items:", error);
      }
    };

    if (userID) {
      fetchRecentItems();
    }
  }, [userID]); 

  if (!recentItems || recentItems.length === 0) {
    return (
    <div className="RecentPostedSeller-container">
      <h2 className="RecentPostedSeller-title">Your Recently Posted</h2>
      <div className="RecentPostedSeller-content">
      <p>No recent items found</p>
      </div>
    </div>)
  }


  return (
    <div className="RecentPostedSeller-container">
      <h2 className="RecentPostedSeller-title">Your Recently Posted</h2>
      <div className="RecentPostedSeller-content">
        {recentItems.map((item, index) => (
          <div key={index} className="RecentPostedSeller-section">
            <Card className="RecentPostedSeller-card">
              <Card.Img variant="top" src={item.images[0] || '/product-placeholder.png'} className="RecentPostedSeller-img" />
              <Card.Body>
                <Card.Title className="RecentPostedSeller-title-text">{item.productName}</Card.Title>
                <p className="RecentPostedSeller-price">{item.price}</p>
                <p className="RecentPostedSeller-status">{item.status}</p>
                <div className="RecentPostedSeller-button-wrapper">
                  <Button
                    variant="dark"
                    className="RecentPostedSeller-details-btn"
                    onClick={() => navigate(`/ProductDetail/${item._id}`)}
                  >
                    Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div className="sell-all-seller-wrapper">
        <a href={`/Profile/${userID}`}>See all</a>
      </div>
    </div>
  );
}

export default RecentPostedSeller;
