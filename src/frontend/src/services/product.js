const BASE_URL = "http://localhost:3000/products";

const productAPI = {
    createProduct: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: "POST",
                body: data,
            });
            return await response.json();
        } catch (error) {
            console.error("Error during creating product", error);
            return { success: false, message: "An error occurred" };
        }
    },

};
export default productAPI;