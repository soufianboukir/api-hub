import { auth } from "@/auth";
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

        const {name,username,email,bio} = await request.json();
    }catch{
        return NextResponse.json({
            message:"Failed to update profile info"
        },{
            status: 500
        })
    }
}