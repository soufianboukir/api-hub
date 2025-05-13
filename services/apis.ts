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
    const response = await api.get(`/api/apiApp/apis/${apiId}`);
    return response.data.api;
}

export const publishApi = async (formData: ApiForm) =>{
    const response = await api.post('/api/apiApp/publish',formData);
    return response;
}

export const updateApi = async (formData: ApiForm,apiId: string) =>{
    const response = await api.put(`/api/apiApp/apis/${apiId}`,formData)
    console.log(response);
    
    return response;
}