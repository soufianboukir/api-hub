import { api } from "@/api-config";

type GetCategoriesParams = {
    limit?: number
}

export const getCategories = async ({ limit }: GetCategoriesParams) =>{
    const response = await api.get(`/api/category?limit=${limit}`);
    return response;
}