import { auth } from "@/auth";
import { updateProfileInfo } from "@/controllers/updateImages.controller";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> =>{
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({
                message: "Unauthorized"
            },{
                status:401
            })
        }

        const {name,username,email,bio,password,newPassword,retypePassword} = await request.json();
        const response = await updateProfileInfo({
            profileInfo: {name,username,email,bio,password,newPassword,retypePassword}
        },session.user.id);

        if(response.success){
            return NextResponse.json({
                message: response.message
            })
        }else{
            return NextResponse.json({
                message: response.message
            },{
                status: 400
            })
        }

    }catch{
        return NextResponse.json({
            message:"Failed to update profile info"
        },{
            status: 500
        })
    }
}