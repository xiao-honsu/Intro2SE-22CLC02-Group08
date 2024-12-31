const BASE_URL = "https://intro2se-22clc02-group08-back-end.onrender.com/products";

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
    },

    getAllProductsPending: async () => {
        try {
            const response = await fetch(`${BASE_URL}/`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Lỗi khi lấy danh sách sản phẩm");
            }

            return await response.json();
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            return { success: false, message: "Đã có lỗi xảy ra" };
        }
    },

    getAllProductsNotPurchased: async () => {
        try {
            const response = await fetch(`${BASE_URL}/notpurchased`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch products with status 'Not Purchased'.");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
            return { success: false, message: "An error occurred while fetching products." };
        }
    },

    updateProductStatus: async (productId, status) => {
        try {
            const response = await fetch(`${BASE_URL}/update-status/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update product status for ${productId}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error updating product status:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    searchProduct: async (keyword) => {
        try {
            const response = await fetch(`${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch search results.");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching product:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    getRecentProductsBySeller: async (sellerId, limit = 2) => {
        try {
            const response = await fetch(`${BASE_URL}/recent/${sellerId}?limit=${limit}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch recent products for seller ${sellerId}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error during fetching recent products by seller:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    getProductsUpdatedToday: async () => {
        try {
            const response = await fetch(`${BASE_URL}/updated/today`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch today's products.");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching today's products:", error);
            return { success: false, message: "An error occurred" };
        }
    },

};
export default productAPI;