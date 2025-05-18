import { auth } from "@/auth"
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (request: NextRequest,
    context: { params: { messageId: string } }
): Promise<NextResponse> =>{
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status: 401
            })
        }

        const { messageId } = context.params; 
        const deleted = await Message.findOneAndDelete({
            _id: messageId,
            sender: session.user.id,
        });
      
        if (!deleted) {
            return NextResponse.json(
                { message: "Message not found or you're not authorized" },
                { status: 404 }
            );
        }
      
        return NextResponse.json({ 
            message: "Message deleted successfully!" 
        });
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message: 'Failed to delete message'
        },{
            status: 500
        })
    }
}