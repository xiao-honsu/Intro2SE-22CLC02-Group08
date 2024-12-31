
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Category from '../components/Category';
import Footer from '../components/Footer';
import UserContext from "../context/userContext";
import '../styles/SupportPageSeller.scss';

function SupportPageSeller() {
    const { userType, setUserType } = useContext(UserContext);
    const { userInfo, setUserInfo } = useContext(UserContext);
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

                
            </div> 
        
            <div className="content-container">
                <div className="title">Support</div>
                <div className="subtitle" id="toSalesguidance">Sales guidance</div>
                <div className="content">
                    • Take clear photos: The more photos, the better. Buyers like to see products from all angles. Add product videos to make it easier to sell.<br/>
                    • Full product description: Add the product name and category like 'Electronics' or Bags'. Mention product condition accurately.<br/>
                    • Set a reasonable price: Search for similar products to find a reasonable price range. Good feedback will help build your shop's brand!<br/>
                    • Click the “upload” button to push your item on our website and wait for a customer buy it.
                </div>
                <div className="subtitle" id="to-protectionpolicy">Buyer protection policy</div>
                <div className="content">
                    T-2Hands creates a safe and friendly marketplace for users. If an item received does not match the description, the Buyer can file a complaint with T-2Hands within 3 days. First, we will discuss with the Seller to give them a chance to rectify the issue. If both parties cannot reach an agreement after 3 days, T-2Hands will intervene to resolve the matter. You can see the Feedback section below.
                    <br/> Buyers are only eligible to file complaints if they adhere to the Buyer's principles:
                </div>  
                <div className="content-list">
                    • Do not purchase prohibited items.<br/>
                    • Inspect the product upon delivery and do not rate the Seller unless you are satisfied.
                </div>
                <div className="content">
                    You have 3 days from the successful delivery date to file a complaint. If you do not contact T-2Hands within 3 days of receiving the item, an automatic rating will be processed. Once the Buyer has rated the Seller, the transaction is moved to the "Completed" status, meaning the Buyer can no longer file a complaint."
                </div>
                <div className="subtitle" id="to-feedback">Feedback</div>
                <div className="content">
                    For any feedback or questions, you're welcome to contact us directly via email at: therecordnight202@gmail.com.<br/>
                    In your email, please include a clear and concise subject line that summarizes your main concern. Briefly describe the issue you're encountering in the email body.
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default SupportPageSeller;