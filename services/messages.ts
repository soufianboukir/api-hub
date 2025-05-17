import { api } from "@/api-config"

export const getMessages = async (conversationId: string) =>{
    const response = await api.get(`/api/messages/${conversationId}`);
    return response;
}

export const sendMessage = async (conversationId: string, message: string) =>{
    const response = await api.post(`/api/messages/${conversationId}`,{message});
    return response;
}