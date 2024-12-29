import React, { useState, useEffect } from "react";
import supportAPI from "../services/support";
import "../styles/Support.scss";

const Support = () => { 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userID = localStorage.getItem("id");
  useEffect(() => {
    const fetchMessages = async () => {
        try {
            const response = await supportAPI.getMessages(userID);
            if (response.success) {
                setMessages(response.messages);
            }
        } catch (error) {
            console.error("Error fetching support messages:", error);
        }
    };

    fetchMessages();
}, [userID]);

const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
        const response = await supportAPI.sendMessage(userID, newMessage);
        if (response.success) {
            setMessages((prev) => [...prev, response.message]);
            setNewMessage("");
        }
    } catch (error) {
        console.error("Error sending support message:", error);
    }
};

  return (  
    <div className="support-container">   
      <div className="support-area">  
        <div className="support-header">  
          <span className="support-from-admin">Get support from Admin</span>  
        </div>  
        <div className="message-support-area">  
        {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.senderID === userID ? "user" : "admin"}`}>
                            {msg.message}
                        </div>
                    ))}
        </div>  
        <input type="text" placeholder="Enter Content" className="message-support-input"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} />  
      </div>  
    </div>  
  );  
};  

export default Support;