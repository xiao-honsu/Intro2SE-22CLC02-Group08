import React, { useState, useEffect } from "react";
import supportAPI from "../services/support";
import supportChatAPI from "../services/supportChat";
import "../styles/Support.scss";

const Support = () => { 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userID = localStorage.getItem("id");
  const [adminID, setAdminID] = useState(null);

  useEffect(() => {
    const initializeChat = async () => {
        try {
            // Tìm admin đã gán hoặc gán admin mới
            const adminResponse = await supportAPI.findAdminForUser(userID);
            if (adminResponse.success) {
                setAdminID(adminResponse.adminID);

                // Sau khi có adminID, lấy danh sách tin nhắn
                const messagesResponse = await supportChatAPI.getMessages(userID, adminResponse.adminID);
                if (messagesResponse.success) {
                    setMessages(messagesResponse.messages);
                }
            }
        } catch (error) {
            console.error("Error initializing chat:", error);
        }
    };

    initializeChat();
}, [userID]);

const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      console.log("Sending data:", { senderID: userID, message: newMessage });
      const response = await supportChatAPI.sendMessage(userID, adminID, newMessage, "user");
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