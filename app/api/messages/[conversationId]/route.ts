import { auth } from "@/auth";
import Message from "@/models/message.model";
import Conversation from "@/models/conversation.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    request: NextRequest,
    { params }: { params: { conversationId: string } }
    ): Promise<NextResponse> => {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json({
                message: "Unauthorized" 
            }, { status: 401 });
        }

        const messages = await Message.find({ conversation: params.conversationId })
                                        .sort({ createdAt: 1 })
                                        .populate("sender", "-password -email");

        return NextResponse.json({ messages });
    } catch {
        return NextResponse.json(
            { message: "Failed to get messages" },
            { status: 500 }
        );
    }
};

export const POST = async (
    request: NextRequest,
    context: { params: Promise<{ conversationId: string }> }
  ): Promise<NextResponse> => {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
    
        const { conversationId } = await context.params;
    
        const { text } = await request.json();
    
        const newMessage = await new Message({
            sender: session.user.id,
            conversation: conversationId,
            text,
        }).save();
    
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: text,
            updatedAt: new Date(),
        });
    
        return NextResponse.json({
            message: "Message sent",
            newMessage,
        });
    } catch {
        return NextResponse.json(
            { message: "Failed to send message" },
            { status: 500 }
        );
    }
  };
  