import { auth } from "@/auth";
import { dbConnection } from "@/lib/dbConnection";
import FavoriteApi from "@/models/favorite.model";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest,{params}:{params:{favoriteId: string}})
:Promise<NextResponse> =>{
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status: 401
            })
        }
        await dbConnection()
        const { favoriteId } = await params;

        const result = await FavoriteApi.deleteOne({
            _id: favoriteId,
            user: session.user.id,
        });
    
        if (result.deletedCount === 0) {
            return NextResponse.json(
                { message: 'Favorite not found or unauthorized' },
                { status: 404 }
            );
        }
    
        return NextResponse.json({
            message: 'API successfully removed from favorites!',
        });

    }catch{
        return NextResponse.json(
            {
                message:"Failed to unfavorite api",
            }, {
                status : 500,
            }
        );
    }
}