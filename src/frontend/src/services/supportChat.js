const BASE_URL = "http://localhost:3000/support-chat";

const supportChatAPI = {
    getMessages: async (userID, adminID) => {
        const response = await fetch(`${BASE_URL}/${userID}/${adminID}`);
        return await response.json();
    },
    sendMessage: async (senderID, receiverID, message, role) => {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senderID, receiverID, message, role }),
        });
        return await response.json();
    },
};

export default supportChatAPI;
