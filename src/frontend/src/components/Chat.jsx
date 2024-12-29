import React, { useState, useEffect } from "react";
import messageAPI from "../services/message"; 
import "../styles/Chat.scss";  

const Chat = ({ userID,  sellerID, sellerName }) => {  
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await messageAPI.getChatList(userID);
        if (response.success) {
          setChatList(response.chatList);
        }
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };
    fetchChatList();
  }, [[userID]]);

  const fetchMessages = async (otherUserID) => {
    try {
      const response = await messageAPI.getMessages(userID, otherUserID);
      if (response.success) {
        setMessages(response.messages);
        setSelectedChat(otherUserID);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    try {
      if (newMessage.trim()) {
        const response = await messageAPI.sendMessage({
          senderID: userID,
          receiverID: selectedChat,
          content: newMessage,
        });
        if (response.success) {
          setMessages([...messages, response.data]); 
          setNewMessage(""); 
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (sellerID && sellerName) {
        const exists = chatList.find((chat) => chat.otherUser._id === sellerID);
        if (!exists) {
            const newChat = {
                otherUser: {
                    _id: sellerID,
                    username: sellerName,
                },
                lastMessage: "", 
            };
            setChatList([newChat, ...chatList]); 
        }
        fetchMessages(sellerID);
    }
}, [sellerID, sellerName, chatList]);

  return (  
    <div className="chat-container">  
      <div className="sidebar">  
        <input type="text" placeholder="Search" className="search-bar-chat" />  
        <ul className="user-list">  
          {chatList.map((chat) => (
            <li key={chat.otherUser._id} className="user-item" onClick={() => fetchMessages(chat.otherUser._id)}>  
              <img src={chat.otherUser.avatar || "default-avatar.jpg"} alt="User" className="user-icon" />  
              <span className="user-name">{chat.otherUser.username}</span>  
              <span className="last-message">{chat.lastMessage}</span>
            </li>
          ))} 
        </ul>  
      </div>  
      <div className="chat-area">  
        {selectedChat ? (
          <>
            <div className="chat-header">  
              <span className="chat-name">{chatList.find(chat => chat.otherUser._id === selectedChat)?.otherUser.username}</span>  
            </div>  
            <div className="message-area">  
              {messages.map(message => (  
                <div key={message._id} className={`message ${message.senderID === localStorage.getItem("userID") ? "me" : "other"}`}>  
                  {message.content}  
                </div>  
              ))}  
            </div>  
            <input 
              type="text" 
              placeholder="Enter Content" 
              className="message-input" 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />  
          </>
        ) : (
          <div className="no-chat-selected">Select a chat to start messaging</div>
        )}
      </div>   
    </div>  
  );  
};  

export default Chat;