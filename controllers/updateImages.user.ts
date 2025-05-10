import { dbConnection } from "@/lib/dbConnection"
import User, { UserI } from "@/models/user.model";

export const updateUserImage = async (username: string,path: string,type: 'profile' | 'background') =>{
    try{
        await dbConnection();
        const user:UserI | null = await User.findOne({username});
        if(!user){
            return {
                success: false,
                message: `Failed to update ${type} image`
            }
        }
    
        if(type === 'profile'){
            user.profile_picture = path;
        }else{
            user.bg_picture = path;
        }
        await user.save();

        return {
            success: true,
            message: `Profile updated successfully!`
        }
    }catch{
        return {
            success: false,
            message: `Failed to update ${type} image`
        }
    }
}