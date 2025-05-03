import axios from "axios"

type GetCategoriesParams = {
    limit?: number
}

export const getCategories = async ({ limit }: GetCategoriesParams) =>{
    const response = await axios.get(`http://localhost:3000/api/category?limit=${limit}`);
    return response;
}