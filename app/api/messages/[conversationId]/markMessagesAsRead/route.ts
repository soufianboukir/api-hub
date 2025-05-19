import { auth } from "@/auth"
import Message from "@/models/message.model";
import { NextResponse } from "next/server"

export const POST = async ( context: { params: Promise<{ conversationId: string }> }
):Promise<NextResponse> =>{
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status: 401
            })
        }

        const { conversationId } = await context.params;

        await Message.updateMany(
            {
                conversation: conversationId,
                sender: { $ne: session.user.id },
                isRead: false
            },
            {
                $set: { isRead: true }
            }
        );

        return NextResponse.json({
            message: 'Successfully Marked as read'
        })
    }catch{
        return NextResponse.json({
            message: 'Failed to mark messages as read'
        },{
            status: 500
        })
    }
}