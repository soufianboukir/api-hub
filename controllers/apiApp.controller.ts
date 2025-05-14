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
    const limit = 6;
    const skip = (page - 1) * limit;

    try {
        const apis = await Api.find({ author: userId },{avatar:1,title:1,description:1,updatedAt:1})
                              .skip(skip)
                              .limit(limit)
                              .sort({createdAt:-1})
                              .populate('author','username')
                              .populate('category','name');

        const total = await Api.countDocuments({ author: userId });

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
            author:authorId,
            category: formData.category,
            title: formData.title,
            avatar: avatarUrl,
            description: formData.description,
            baseUrl: formData.baseUrl,
            endPoints: formData.endpoints,
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
