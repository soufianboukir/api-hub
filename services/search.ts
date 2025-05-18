import { api } from "@/api-config"

export const filterApisByCategory = async (page: number, categoryName: string) =>{
    const response = await api.get(`/api/apiApp/apis/category/${categoryName}?page=${page}`);
    return response;
}