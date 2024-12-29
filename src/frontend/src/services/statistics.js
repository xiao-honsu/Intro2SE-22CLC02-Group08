const BASE_URL = "http://localhost:3000/statistics";

const statisticsAPI = {
    getStatistics: async () => {
        try {
            const response = await fetch(BASE_URL, {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json", 
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch statistics');
            }


            return await response.json();
        } catch (error) {
            console.error("Error during fetching statistics:", error);
            return { success: false, message: "An error occurred" };
        }
    }

};
export default statisticsAPI;