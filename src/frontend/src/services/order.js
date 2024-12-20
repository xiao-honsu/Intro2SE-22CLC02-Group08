const BASE_URL = "http://localhost:3000/order";

const orderAPI = {
    createOrder: async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error during creating order", error);
            return { success: false, message: result.message || "An error occurred" };
        }
    },

    getOrdersByBuyer: async (buyerId) => {
        try {
            const response = await fetch(`${BASE_URL}/buyer/${buyerId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch orders for buyer ${buyerId}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error during fetching orders by buyer:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    deleteOrder: async (orderId) => {
        try {
            const response = await fetch(`${BASE_URL}/${orderId}`, {
                method: "DELETE",
            });
            return await response.json();
        } catch (error) {
            console.error("error during deleting order", error);
            return { success: false, message: "An error occurred"};
        }
    },

    updateOrderStatus: async (orderId, status) => {
        try {
            const response = await fetch(`${BASE_URL}/update-status/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update order status for ${orderId}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error updating order status:", error);
            return { success: false, message: "An error occurred" };
        }
    },

};
export default orderAPI;