import { auth } from "@/auth";
import { dbConnection } from "@/lib/dbConnection";
import FavoriteApi from "@/models/favorite.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest):Promise<NextResponse> =>{
    try{
        const session = await auth()
        if(!session){
            return NextResponse.json({
                message: "Unauthorized"
            },{status:401})
        }
        

        const url = new URL(request.url);
        const pageParam = url.searchParams.get('page');
        const page = pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : 1;
        
        const limit = 9;
        const skip = (page - 1) * limit;
        await dbConnection()

        const favoriteApis = await FavoriteApi.find({ user: session.user.id })
                                            .skip(skip)
                                            .limit(limit)
                                            .sort({ createdAt: -1 })
                                            .populate({
                                                path: 'api',
                                                select: 'avatar title description updatedAt category',
                                                populate: [{
                                                        path: 'category',
                                                        select: 'name'
                                                    },
                                                    {
                                                        path: "author",
                                                        select: '_id username'
                                                    }]
                                            });
        const total = await FavoriteApi.countDocuments({ user: session.user.id });

        if(favoriteApis){
            return NextResponse.json({
                favoriteApis,
                total,
                totalPages: Math.ceil(total / limit)
            })
        }
        
        return NextResponse.json(
            {
                message:"No favorite apis founded",
            }, {
                status : 404,
            }
        );
    }catch{
        return NextResponse.json(
            {
                message:"Failed to fetch User favorite api's",
            }, {
                status : 500,
            }
        );
    }
}


export const POST = async (request: NextRequest):Promise<NextResponse> =>{
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
        const { apiId } = await request.json();
        
        const exists = await FavoriteApi.findOne({ api: apiId, user: session.user.id });
        if (exists) {
            return NextResponse.json({
                message: 'API is already in favorites',
            }, 
            { status: 400 });
        }

        await FavoriteApi.create({
            api: apiId,
            user: session.user.id
        })

        return NextResponse.json({
            message:"Api successfully marked as favorite!",
        });

    }catch{
        return NextResponse.json(
            {
                message:"Failed to favorite api",
            }, {
                status : 500,
            }
        );
    }
}

