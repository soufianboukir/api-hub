import { auth } from "@/auth"
import Conversation from "@/models/conversation.model";
import { NextResponse } from "next/server"

export const GET = async (): Promise<NextResponse> =>{
    try{
        const session = await auth();

        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status: 401
            }) 
        }

        const conversations = await Conversation.find({participants:{$in:[session.user.id]}})
                                                .sort({updatedAt:-1})
                                                .populate('participants', '-password -email')
        
        if(conversations){
            return NextResponse.json({
                conversations
            }) 
        }

        return NextResponse.json({
            message: 'Try to start a conversation by asking an api publisher if its available'
        },{
            status: 404
        }) 
    }catch{
        return NextResponse.json({
            message: 'Failed to fetch your conversations'
        },{
            status: 500
        }) 
    }
}