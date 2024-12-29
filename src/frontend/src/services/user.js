const BASE_URL = "http://localhost:3000/user";

const userAPI = {
    getProfile: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            return await response.json();
        } catch (error) {
            console.error("Error during fetching profile:", error);
            return { success: false, message: "An error occurred" };
        }
    },

    updateProfile: async (userId, updatedData) => {
        try {    
            const response = await fetch(`${BASE_URL}/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(updatedData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user profile');
            }
    
            return await response.json();
        } catch (error) {
            console.error("Error updating user profile:", error);
            return null;
        }
    },

    deleteUser: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/${userId}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
    
            return await response.json();
        } catch (error) {
            console.error("Error deleting user:", error);
            return { success: false, message: "An error occurred while deleting the user" };
        }
    },

    getAllUsers: async () => {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return await response.json(); // Giả sử API trả về { success: true, users: [...] }
        } catch (error) {
            console.error("Error fetching users:", error);
            return { success: false, message: "An error occurred" };
        }
    },
};
export default userAPI;