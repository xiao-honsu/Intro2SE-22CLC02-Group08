const BASE_URL = "http://localhost:3000/message";

const messageAPI = {
    getMessages: async (userID, receiverID) => {
        try {
            const response = await fetch(`${BASE_URL}/${userID}/${receiverID}`);
            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }
            return await response.json();
        } catch (error) {
            console.error("Error during fetching messages:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    sendMessage: async (senderID, receiverID, content) => {
        try {
            const response = await fetch(`${BASE_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senderID, receiverID, content }),
            });
            if (!response.ok) {
                throw new Error("Failed to send message");
            }
            return await response.json();
        } catch (error) {
            console.error("Error during sending message:", error);
            return { success: false, message: "An error occurred" };
        }
    },
};

export default messageAPI;
