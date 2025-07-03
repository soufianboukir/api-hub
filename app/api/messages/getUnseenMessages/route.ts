import { auth } from "@/auth";
import Message from "@/models/message.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ 
                message: 'Unauthorized' 
            }, { status: 401 });
        }

        const userId: string = session.user.id;
        
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const unseen = await Message.aggregate([
            {
                $match: {
                    isRead: false,
                    sender: { $ne: userObjectId }
                }
            },
            {
                $lookup: {
                    from: "conversations",
                    localField: "conversation",
                    foreignField: "_id",
                    as: "conv"
                }
            },
            { $unwind: "$conv" },
            {
                $match: {
                    "conv.participants": userObjectId
                }
            },
            {
                $group: {
                    _id: "$conversation"
                }
            },
            {
                $count: "unseenConversations"
            }
        ]);

        const unseenMessages = unseen[0]?.unseenConversations || 0;
        return NextResponse.json({ unseenMessages });

    } catch {
        return NextResponse.json({
            message: 'Failed to fetch resource'
        }, {
            status: 500
        });
    }
}
