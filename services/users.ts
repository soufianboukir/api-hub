import { api } from "@/api-config";

export const fetchUserData = async (username: string) => {
    try {
        const response = await api.get(`/api/user?username=${username}`);
        return response.data;
    } catch (error: unknown) {
        if (error.response) {
            return error.response.data;
        }
        throw error; 
    }
}