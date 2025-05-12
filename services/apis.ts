import { api } from "@/api-config"
import { ApiForm } from "@/interfaces/api";

export const publishApi = async (formData: ApiForm) =>{
    const response = await api.post('/api/apiApp/publish',formData);
    return response;
}