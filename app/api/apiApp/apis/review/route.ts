import { auth } from "@/auth";
import Api from "@/models/api.model";
import Notification from "@/models/notification.model";
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

        if(api.author.toString() !== session.user.id){
            await Notification.create({
                message: "Reviewed your api",
                url: `/api/${api._id}`,
                fromUser: session.user.id,
                toUser: api.author,
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
    }catch(error){
        console.log(error);
        
        return NextResponse.json(
            {
                error:"Failed to review api",
            }, {
                status : 500,
            }
        );
    }
}