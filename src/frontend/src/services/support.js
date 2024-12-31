const BASE_URL = "https://intro2se-22clc02-group08-back-end.onrender.com/support";

const supportAPI = {
    findAdminForUser: async (userID) => {
        try {
            const response = await fetch(`${BASE_URL}/find-admin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userID }),
            });
            return await response.json();
        } catch (error) {
            console.error("Error finding admin for user:", error);
            throw error;
        }
    },
};

export default supportAPI;
