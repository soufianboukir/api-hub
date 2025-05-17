import { auth } from "@/auth"
import Notification from "@/models/notification.model";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const session = await auth();

        if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(request.url);
        const limitParam = url.searchParams.get('limit');
        const pageParam = url.searchParams.get('page');

        const limit = limitParam ? parseInt(limitParam) : null;
        const page = pageParam ? parseInt(pageParam) : 1;
        const skip = limit ? (page - 1) * limit : 0;

        let query = Notification.find({ toUser: session.user.id })
                                .populate('fromUser')
                                .sort({ createdAt: -1 });

        const totalNotifications = await Notification.countDocuments({ toUser: session.user.id });
        const totalPages = limit ? Math.ceil(totalNotifications / limit) : 1;

        if (limit) {
            query = query.skip(skip).limit(limit);
        }

        const notifications = await query;

        return NextResponse.json({
            notifications,
            totalPages,
            currentPage: page,
            totalNotifications
        });
  
    } catch {
        return NextResponse.json({ 
            message: 'Failed to fetch notifications' 
        }, { status: 500 });
    }
};

export async function PATCH():Promise<NextRespons> {
    try{
        const session = await auth();

        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await Notification.updateMany(
            { toUser: session.user.id, isRead: false },
            { $set: { isRead: true } }
        );

        return NextResponse.json({ message: 'All notifications marked as read' });
    }catch{
        return NextResponse.json({ 
            message: 'Failed to update info' 
        }, { status: 500 });
    }
}
