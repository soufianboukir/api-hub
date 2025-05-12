import { ApiForm } from "@/interfaces/api";
import { dbConnection } from "@/lib/dbConnection";
import Api from "@/models/api.model";
import { ControllerResponse } from "@/types";

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