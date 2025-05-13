import { ApiForm } from "@/interfaces/api";
import { dbConnection } from "@/lib/dbConnection";
import Api, { ApiI } from "@/models/api.model";
import { ControllerResponse } from "@/types";

interface ApiResponse extends ControllerResponse{
    apis?: ApiI[],
    totalPages?:number,
    totalApis?: number
}


export const fetchUserApis = async (userId: string, page: number= 1): Promise<ApiResponse> =>{
    const limit = 4;
    const skip = (page - 1) * limit;

    try {
        const apis = await Api.find({ authorId: userId })
                              .skip(skip)
                              .limit(limit);

        const total = await Api.countDocuments({ authorId: userId });

        return {
            success: true,
            message: 'Fetched successfully!',
            apis,
            totalPages: Math.ceil(total / limit),
            totalApis : total,
        };
    }catch{
        return {
            success: false,
            message: 'Failed to publish your api'
        }
    }
}


export const publishApi = async (formData:ApiForm,authorId:string):Promise<ControllerResponse> =>{
    try{
        await dbConnection();
        const avatarUrl = typeof formData.avatar === 'object' ? formData.avatar.src : formData.avatar;
        await Api.create({
            authorId,
            categoryId: formData.categoryId,
            title: formData.title,
            avatar: avatarUrl,
            description: formData.description,
            baseUrl: formData.baseUrl,
            endPoins: formData.endpoints,
            githubLink: formData.github,
            gitLabLink: formData.gitlab,
            documentationUrl: formData.documentation,
        })  

        return {
            success: true,
            message: 'New api published successfully'
        }

    }catch{
        return {
            success: false,
            message: 'Failed to publish your api'
        }
    }
}