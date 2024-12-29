const BASE_URL = "http://localhost:3000/feedback";

const feedbackAPI = {
    createFeedback: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error("Error during creating feedback", error);
            return { success: false, message: "An error occurred" };
        }
    },

    getFeedbackBySeller: async (sellerID) => {
        try {
            const response = await fetch(`${BASE_URL}/seller/${sellerID}`, { method: "GET" });

            if (!response.ok) {
                console.error("Failed to fetch feedback:", response.statusText);
                throw new Error(`Error fetching feedback for seller ${sellerId}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error during fetching feedback by seller:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    getRatingBySeller: async (sellerID) => {
        try {
            const response = await fetch(`${BASE_URL}/sellerRating/${sellerID}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch rating for seller ${sellerID}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error during fetching rating by seller:", error);
            return { success: false, message: "An error occurred" };
        }
    },
};
export default feedbackAPI;