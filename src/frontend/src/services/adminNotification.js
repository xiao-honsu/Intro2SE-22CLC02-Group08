const BASE_URL = "https://intro2se-22clc02-group08-back-end.onrender.com/admin-notification";

const adminNotificationAPI = {
    getNotification: async (receiverID, role) => {
        try {
            const url = role
                ? `${BASE_URL}/${receiverID}?role=${role}`
                : `${BASE_URL}/${receiverID}`;
            console.log(url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch notification');
            }
            return await response.json();
        } catch (error) {
            console.error("Error during fetching notification:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    markAsRead: async (notificationID) => {
        try {
            const response = await fetch(`${BASE_URL}/${notificationID}/read`, {
                method: "PATCH",
            });
            if (!response.ok) {
                throw new Error("Failed to mark notification as read");
            }
            return await response.json();
        } catch (error) {
            console.error("Error during marking notification as read:", error);
            return { success: false, message: "An error occurred" };
        }
    },

};
export default adminNotificationAPI;
