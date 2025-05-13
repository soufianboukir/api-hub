import { auth } from "@/auth";
import { publishApi } from "@/controllers/apiApp.controller";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest):Promise<NextResponse> =>{
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({
                message: "Unauthorized"
            },{
                status:401
            })
        }
        const user = await User.findById(session.user.id);
        if(!user){
            return NextResponse.json({
                message: "User not found"
            },{
                status:404
            })
        }

        const formData = await request.json();
        const response = await publishApi(formData,session.user.id);
        
        if(response.success){
            return NextResponse.json({
                message: response.message
            })
        }
        return NextResponse.json({
                message: response.message,
            }, {
                status : 400,
        });

    }catch{        
        return NextResponse.json(
            {
                message:"Failed to publish your api",
            }, {
                status : 500,
            }
        );
    }
}