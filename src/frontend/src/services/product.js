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

    getProductsBySeller: async (sellerId) => {
        try {
            const response = await fetch(`${BASE_URL}/seller/${sellerId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch products for seller ${sellerId}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error during fetching products by seller:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    deleteProduct: async (productId) => {
        try {
            const response = await fetch(`${BASE_URL}/${productId}`, {
                method: "DELETE",
            });
            return await response.json();
        } catch (error) {
            console.error("error during deleting product", error);
            return { success: false, message: "An error occurred"};
        }
    },

    getProductById: async (productId) => {
        try {
            const response = await fetch(`${BASE_URL}/${productId}`);
            if (!response.ok) {
                throw new Error("Error during fetching product detail");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching product detail:", error);
            return { success: false, message: "An error occurred" };
        }
    }
};
export default productAPI;