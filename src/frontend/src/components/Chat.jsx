import React from 'react';  
import "../styles/Chat.scss";

const Chat = () => {  
  return (  
    <div className="chat-container">  
      <div className="sidebar">  
        <input type="text" placeholder="Search" className="search-bar-chat" />  
        <ul className="user-list">  
          <li className="user-item">  
            <img src="avt1.jpg" alt="User" className="user-icon" />  
            <span className="user-name">name</span>  
          </li>  
          <li className="user-item">  
            <img src="avt1.jpg" alt="User" className="user-icon" />  
            <span className="user-name">name</span>  
          </li>  
          <li className="user-item">  
            <img src="avt1.jpg" alt="User" className="user-icon" />  
            <span className="user-name">name</span>  
          </li>  
          <li className="user-item">  
            <img src="avt1.jpg" alt="User" className="user-icon" />    
            <span className="user-name">name</span>  
          </li>  
        </ul>  
      </div>  
      <div className="chat-area">  
        <div className="chat-header">  
            <img src="avt1.jpg" alt="User" className="user-icon" />  
          <span className="chat-name">name</span>  
        </div>  
        <div className="message-area">  
          {/* Content area for messages */}  
        </div>  
        <input type="text" placeholder="Enter Content" className="message-input" />  
      </div>  
    </div>  
  );  
};  

export default Chat;