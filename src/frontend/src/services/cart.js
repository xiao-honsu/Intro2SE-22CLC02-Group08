const BASE_URL = "http://localhost:3000/cart";

const cartAPI = {
    addToCart: async (buyerID, productID) => {
        try {
            const response = await fetch(`${BASE_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ buyerID, productID }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { 
                    success: false, 
                    message: errorData.message || `Failed to add product to cart. Status: ${response.status}` 
                };
            }

            return await response.json();
        } catch (error) {
            console.error("Error adding to cart:", error);
            return { success: false, message: error.message || "An error occurred while adding to cart." };
        }
    },

    removeFromCart: async (buyerID, productID) => {
        try {
            const response = await fetch(`${BASE_URL}/remove`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ buyerID, productID }),
            });

            if (!response.ok) {
                throw new Error(`Failed to remove product from cart. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error removing from cart:", error);
            return { success: false, message: "An error occurred while removing from cart." };
        }
    },


    getCart: async (buyerID) => {
        try {
            const response = await fetch(`${BASE_URL}/${buyerID}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch cart. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching cart:", error);
            return { success: false, message: "An error occurred while fetching cart." };
        }
    },
};

export default cartAPI;
