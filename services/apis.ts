import { api } from "@/api-config"
import { ApiForm } from "@/interfaces/api";

export const fetchUserApis = async (username: string, page: number) =>{
    try {
        const response = await api.get(`/api/apiApp/apis?username=${username}&page=${page}`);
        return response;
    } catch (error: unknown) {
        if (error.response) {
            return error.response.data;
        }
        throw error; 
    }
}

export const fetchApi = async (apiId: string) =>{
    try{
        const response = await api.get(`/api/apiApp/apis/${apiId}`);
        return response.data.api;
    }catch(error){
        if (error.response) {
            return error.response.data;
        }
        throw error
    }
}

export const publishApi = async (formData: ApiForm) =>{
    const response = await api.post('/api/apiApp/publish',formData);
    return response;
}

export const updateApi = async (formData: ApiForm,apiId: string) =>{
    const response = await api.put(`/api/apiApp/apis/${apiId}`,formData)
    return response;
}

export const getFavoriteApis = async (page: number) =>{
    const response = await api.get(`/api/favorites?page=${page}`);
    return response;
}


export const favoriteApi = async (apiId: string) =>{
    const response = await api.post(`/api/favorites`,{apiId});
    return response
}

export const unfavoriteApi = async (apiId: string) =>{
    const response = await api.delete(`/api/favorites/${apiId}`);
    return response;
}

export const reviewApi = async ({apiId,review}: {apiId: string, review: string}) =>{
    const response = await api.post('/api/apiApp/apis/review',{apiId,review});    
    return response;
}
