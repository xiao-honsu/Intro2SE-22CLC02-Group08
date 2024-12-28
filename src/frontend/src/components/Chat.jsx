import React, { useState, useEffect } from "react";
import messageAPI from "../services/message"; 
import "../styles/Chat.scss";  

const Chat = () => {  
  const [messages, setMessages] = useState([  
    { id: 1, text: "Ê, đi ăn hong?", sender: "me" },  
    { id: 2, text: "Leader bao hả?", sender: "other" },  
    { id: 3, text: "Ừa, lẹ lên :>", sender: "me" },  
    { id: 4, text: "Quá đã, cho t 5p thay đồ", sender: "other" },  
  ]);  

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
          {messages.map(message => (  
            <div key={message.id} className={`message ${message.sender}`}>  
              {message.text}  
            </div>  
          ))}  
        </div>  
        <input type="text" placeholder="Enter Content" className="message-input" />  
      </div>  
    </div>  
  );  
};  

export default Chat;