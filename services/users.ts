import { api } from "@/api-config";

export const fetchUserData = async (username:string)=>{
    const response = await api.get(`/api/user?username=${username}`);
    return response;
}