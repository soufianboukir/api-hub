import { auth } from "@/auth";
import Api from "@/models/api.model";
import Conversation from "@/models/conversation.model";
import Message from "@/models/message.model";
import Notification from "@/models/notification.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> =>{
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status:401
            })
        }
        const { apiId } = await request.json();
        const api = await Api.findById(apiId);
        if(!api){
            return NextResponse.json({
                message: "Api not found"
            },{
                status: 404
            })
        }
        const conversationExists = await Conversation.findOne({
            participants: { $all: [session.user.id, api.author] },
            api: api._id,
          });

          if(conversationExists){
            return NextResponse.json({
                message: "You are already in contact with this user"
            },{
                status: 400
            })
        }

        const newConversation = new Conversation({
            participants: [session.user.id, api.author],
            api: api._id,
            lastMessage: 'hi! is this api available?'
        })
        const newMessage = new Message({
            sender: session.user.id,
            conversation: newConversation._id,
            text: 'hi! is this api available?',
        })
        const newNotification = new Notification({
            fromUser: session.user.id,
            toUser: api.author,
            message: 'Sent you a message about api you published is is still available',
            url: `/api/${api._id}`
        })

        await newConversation.save();
        await newMessage.save();
        await newNotification.save();
        
        return NextResponse.json({
            message: "Your message has been sent successfully!"
        })
    }catch{
        return NextResponse.json({
            message: "Failed to start new conversation"
        },{
            status: 500
        })
    }
}