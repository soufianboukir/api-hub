import { auth } from "@/auth";
import Api from "@/models/api.model";
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

        const { apiId,review } = await request.json();
        const api = await Api.findById(apiId);
        if(!api){
            return NextResponse.json({
                message: "Api not found"
            },{
                status:404
            })
        }

        api.reviews.push({
            author: session.user.id,
            review
        })
        await api.save()

        return NextResponse.json({
            message: "Successfully reviewed this api!"
        })
    }catch{
        return NextResponse.json(
            {
                error:"Failed to fetch user apis",
            }, {
                status : 500,
            }
        );
    }
}