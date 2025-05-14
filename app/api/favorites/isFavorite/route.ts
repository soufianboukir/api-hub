
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import FavoriteApi from '@/models/favorite.model';

export const GET = async (request: NextRequest) => {
    try {
        const session = await auth(request);
        if (!session) {
            return NextResponse.json({ isFavorite: false }, { status: 401 });
        }

        const apiId = request.nextUrl.searchParams.get('apiId');
        if (!apiId) {
            return NextResponse.json({
                 message: 'Missing apiId' },
                 { status: 400 });
        }

        const favorite = await FavoriteApi.findOne({
            api: apiId,
            user: session.user.id,
        });

        return NextResponse.json({ isFavorite: favorite});
    } catch {
        return NextResponse.json({ 
            isFavorite: false }, 
            { status: 500 });
    }
};
