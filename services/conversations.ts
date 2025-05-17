import { api } from "@/api-config"

export const startConversation = async (apiId: string) =>{
    const response = await api.post(`/api/conversations/startNew`,{apiId});
    return response;
}

export const getConversations = async () =>{
    const response = await api.get(`/api/conversations`);
    return response;
}