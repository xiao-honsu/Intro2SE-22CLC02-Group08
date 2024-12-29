const BASE_URL = "http://localhost:3000/access_history";

const accessHistoryAPI = {
    addHistory: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(data), 
            });

            if (!response.ok) {
                throw new Error(`Failed to add access history: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error adding access history:", error);
            return { success: false, message: "An error occurred" };
        }
    },

   

};
export default accessHistoryAPI;