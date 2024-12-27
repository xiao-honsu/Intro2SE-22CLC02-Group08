const BASE_URL = "http://localhost:3000/report";

const reportAPI = {
    createReport: async (data) => {
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
            console.error("Error during creating report", error);
            return { success: false, message: "An error occurred" };
        }
    },

    

    
};
export default reportAPI;