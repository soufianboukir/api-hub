import { api } from "@/api-config"

export const getNotifications = async(limit?:number| null,page?:number) =>{
    const response = await api.get(`/api/notifications?limit=${limit}&page=${page}`);
    return response
}