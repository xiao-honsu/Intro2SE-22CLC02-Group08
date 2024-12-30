import React, { useState, useEffect } from 'react';
import messageAPI from "../services/message"; 
import userAPI from "../services/user";
import supportChatAPI from '../services/supportChat';
import "../styles/Chat.scss";

const ChatAdmin = ({ adminID }) => {  
    const [searchKeyword, setSearchKeyword] = useState("");
    const [userList, setUserList] = useState([]); 
    const [searchResults, setSearchResults] = useState([]);
    const [chatUser, setChatUser] = useState(null);
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await userAPI.getAllUsers();
                setUserList(users.users);
                setSearchResults(users.users);
            } catch (error) {
                console.error("Error fetching users:", error);
                setUserList([]);
                setSearchResults([]);
            }
        };
        fetchUsers();
    }, []);
    

    const handleSearch = async (e) => {
        if (e.key === "Enter") {
            const keyword = searchKeyword.trim().toLowerCase();
            if (keyword === "") {
                setSearchResults(userList); 
            } else {
                const filteredUsers = userList.filter((user) =>
                    user.username.toLowerCase().includes(keyword)
                );
                setSearchResults(filteredUsers);
            } 
        } else {
            const users = await userAPI.getAllUsers();
            setSearchResults(users.users);
        }
    };

    const fetchMessages = async (user) => {
        try {
            setChatUser(user);
            const response = await supportChatAPI.getMessages(user._id, adminID);
            if (response.success) {
                setMessages(response.messages);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "" || !chatUser) return;
        try {
            const sentMessage = await supportChatAPI.sendMessage(adminID, chatUser._id, newMessage, "admin");
            setMessages((prevMessages) => (Array.isArray(prevMessages) ? [...prevMessages, sentMessage.message] : [sentMessage.message]));
            setNewMessage(""); 
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
  
    return (
        <div className="chat-container">
            <div className="sidebar">
                <input type="text" placeholder="Search" className="search-bar-chat"
                        value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} onKeyDown={handleSearch}/>
                <ul className="user-list">
                    {searchResults.map((user) => (
                    <li key={user._id} className="user-item" onClick={() => fetchMessages(user)} >
                        <img src={user.avatar || "default-avatar.jpg"} alt="User" className="user-icon" />
                        <span className="user-name">{user.username}</span>
                    </li>
                    ))}
                </ul>
            </div>

            <div className="chat-area">
            {chatUser ? (
                <>
                    <div className="chat-header">
                        <img src={chatUser.avatar || "default-avatar.jpg"} alt="User" className="user-icon" />
                        <span className="chat-name">{chatUser.username}</span>
                    </div>

                    <div className="message-area">
                        {Array.isArray(messages) && messages.length > 0 ? (
                            messages.map((message, index) => (
                                <div key={index} className={`message ${ String(message.senderID) === String(adminID) ? "me" : "other" }`} >
                                    {message.message}
                                </div>
                            ))
                        ) : (
                            <div className="no-messages">No messages yet</div>
                        )}
                    </div>

                    <div className="message-input-container">
                        <input type="text" placeholder="Enter your message" className="message-input" value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                        />
                    </div>
                </>
                ) : (
                    <div className="chat-placeholder">Select a user to start chatting</div>
                )}
            </div>
        </div>
    );
};  
export default ChatAdmin;