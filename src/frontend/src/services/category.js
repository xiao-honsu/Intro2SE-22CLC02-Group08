const BASE_URL = "https://intro2se-22clc02-group08-back-end.onrender.com/categories";

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