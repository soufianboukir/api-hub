import { ProfileInfo } from "@/components/client/EditProfile";
import { dbConnection } from "@/lib/dbConnection"
import User, { UserI } from "@/models/user.model";
import { ControllerResponse } from "@/types";
import bcrypt from "bcryptjs";

export const updateUserImage = async (username: string,path: string,type: 'profile' | 'background'):Promise<ControllerResponse> =>{
    try{
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

export const updateProfileInfo = async ({profileInfo}:{profileInfo: ProfileInfo}, id: string):Promise<ControllerResponse> =>{
    try{
        await dbConnection();
        const user: UserI | null = await User.findById(id);
        if(!user){
            return {
                success: false,
                message: `Failed to update profile info`
            }
        }

        if(profileInfo.password){
            if(profileInfo.newPassword !== profileInfo.retypePassword){
                return {
                    success: false,
                    message: `Passwords mismatch`
                }
            }
            const comparePasswords: boolean = await bcrypt.compare(profileInfo.password,user.password);
            if(!comparePasswords){
                return {
                    success: false,
                    message: `Password is incorrect`
                }
            }else{
                const hashedPassword:string = await bcrypt.hash(profileInfo.newPassword!,10);
                user.password = hashedPassword;
            }
        }

        if(profileInfo.email){
            const existingEmail:boolean | null = await User.findOne({
                email: profileInfo.email,
                _id: {$ne: id}
            })
            if(existingEmail){
                return {
                    success: false,
                    message: `This email is already exists`
                }
            }else{
                user.email = profileInfo.email;
            }
        }

        if(profileInfo.username){
            const existingUsername:boolean | null = await User.findOne({
                username: profileInfo.username,
                _id: {$ne: id}
            })
            if(existingUsername){
                return {
                    success: false,
                    message: `Username already exists`
                }
            }else{
                user.username = profileInfo.username;
            }
        }

        user.name = profileInfo.name;
        user.bio = profileInfo.bio;
        await user.save();

        return {
            success: true,
            message: 'Profile info updated successfully'
        }
    }catch{
        return {
            success: false,
            message: `Failed to update profile info`
        }
    }
}