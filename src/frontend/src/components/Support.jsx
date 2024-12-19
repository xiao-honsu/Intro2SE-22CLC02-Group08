import React, { useState } from 'react';   
import "../styles/Support.scss";

const Support = () => { 
  const [messages, setMessages] = useState([  
    { id: 1, text: "How can I help you?", sender: "admin" },  
    { id: 2, text: "How can I upload a new product?", sender: "user" },  
  ]);  

  return (  
    <div className="support-container">   
      <div className="support-area">  
        <div className="support-header">  
          <span className="support-from-admin">Get support from Admin</span>  
        </div>  
        <div className="message-support-area">  
         {messages.map(message => (  
            <div key={message.id} className={`message ${message.sender}`}>  
              {message.text}  
            </div>  
          ))}  
        </div>  
        <input type="text" placeholder="Enter Content" className="message-support-input" />  
      </div>  
    </div>  
  );  
};  

export default Support;