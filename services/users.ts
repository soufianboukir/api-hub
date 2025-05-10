import { api } from "@/api-config";
import { ProfileInfo } from "@/components/client/EditProfile";

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

export const updateUserProfile = async (formData: FormData) =>{
    const response = await api.post(`/api/user/upload`,formData)
    return response;
}

export const updateUserProfileInfo = async (formData: ProfileInfo) =>{
    const response = await api.post('/api/user/update',formData);
    return response;
}