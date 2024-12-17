const BASE_URL = "http://localhost:3000/categories";

const categoryAPI = {
    getCategories: async () => {
        try {
            const response = await fetch(`${BASE_URL}`);
            return await response.json();
        } catch (error) {
            console.error("Error during fetching categories", error);
            return { success: false, message: "An error occurred" };
        }
    },

};
export default categoryAPI;