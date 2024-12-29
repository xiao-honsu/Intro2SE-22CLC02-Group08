const BASE_URL = "http://localhost:3000/support";

const supportAPI = {
    sendMessage: async (senderID, message) => {
        try {
            const response = await fetch(`${BASE_URL}/`, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senderID, message }),
            });
            if (!response.ok) throw new Error("Failed to send support message");
            return await response.json();
        } catch (error) {
            console.error("Error sending support message:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    getMessages: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/${userId}`); 
            if (!response.ok) throw new Error("Failed to fetch support messages");
            return await response.json();
        } catch (error) {
            console.error("Error fetching support messages:", error);
            return { success: false, message: "An error occurred" };
        }
    },
};

export default supportAPI;
