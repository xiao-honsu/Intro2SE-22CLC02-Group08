import React from 'react';  
import "../styles/Support.scss";

const Support = () => {  
  return (  
    <div className="support-container">   
      <div className="support-area">  
        <div className="support-header">  
          <span className="support-from-admin">Get support from Admin</span>  
        </div>  
        <div className="message-support-area">  
          {/* Content area for messages */}  
        </div>  
        <input type="text" placeholder="Enter Content" className="message-support-input" />  
      </div>  
    </div>  
  );  
};  

export default Support;