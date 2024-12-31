const BASE_URL = "https://intro2se-22clc02-group08-back-end.onrender.com/message";

const messageAPI = {
   
    getMessages: async (userID, receiverID) => {
        try {
            const response = await fetch(`${BASE_URL}/${userID}/${receiverID}`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            return await response.json();
        } catch (error) {
            console.error("Error fetching messages:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    sendMessage: async (senderID, receiverID, content) => {
        try {
            const response = await fetch(`${BASE_URL}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senderID, receiverID, content }),
            });
            if (!response.ok) throw new Error('Failed to send message');
            return await response.json(); 
        } catch (error) {
            console.error("Error sending message:", error);
            return { success: false, message: "An error occurred" };
        }
    },

};

export default messageAPI;
