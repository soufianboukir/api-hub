import { auth } from "@/auth";
import { dbConnection } from "@/lib/dbConnection";
import FavoriteApi from "@/models/favorite.model";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest,{params}:{params:{favoriteId: string}})
:Promise<NextResponse> =>{
    try{
        const session = await auth(request);
        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status: 401
            })
        }
        await dbConnection()
        const { favoriteId } = params;
        
        await FavoriteApi.deleteOne({$and:[{_id:favoriteId},{user:session.user.id}]})

        return NextResponse.json({
            message:"Api successfully removed from favorites!",
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