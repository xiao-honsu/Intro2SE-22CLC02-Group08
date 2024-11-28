const BASE_URL = "http://localhost:3000/auth";

const authAPI = {
    login: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("Error during login:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    choose_role: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/choose_role`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error("Error during choose role:", error);
            return { success: false, message: "An error occurred" };
        }
    },
    
};
export default authAPI;