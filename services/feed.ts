import { api } from "@/api-config"

export const getFeed = async (page:number) =>{
    const response = await api.get(`/api/feed?page=${page}`);
    return response;
}