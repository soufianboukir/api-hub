import { api } from "@/api-config"

export const getMessages = async (conversationId: string) =>{
    const response = await api.get(`/api/messages/${conversationId}`);
    return response;
}

export const _sendMessage = async (conversationId: string, text: string) =>{
    const response = await api.post(`/api/messages/${conversationId}`,{text});
    return response;
}

export const _deleteMessage = async (messageId: string) =>{
    const response = await api.delete(`/api/messages/deleteMessage/${messageId}`);
    return response
}

export const getUnseenMessages = async () =>{
    const response = await api.get(`/api/messages/getUnseenMessages`);
    return response;
}

export const markMessagesAsRead = async (conversationId: string) =>{
    const response = await api.post(`/api/messages/markMessagesAsRead`,{conversationId});
    return response;
}