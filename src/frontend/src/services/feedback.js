const BASE_URL = "http://localhost:3000/feedback";

const feedbackAPI = {
    createFeedback: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: "POST",
                body: data,
            });
            return await response.json();
        } catch (error) {
            console.error("Error during creating feedback", error);
            return { success: false, message: "An error occurred" };
        }
    },

    getFeedbackBySeller: async (sellerId) => {
        try {
            const response = await fetch(`${BASE_URL}/seller/${sellerId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch feedback for seller ${sellerId}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error during fetching feedback by seller:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    getRatingBySeller: async (sellerId) => {
        try {
            const response = await fetch(`${BASE_URL}/sellerRating/${sellerId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch rating for seller ${sellerId}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error during fetching rating by seller:", error);
            return { success: false, message: "An error occurred" };
        }
    },
};
export default feedbackAPI;