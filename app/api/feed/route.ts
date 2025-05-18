import { auth } from "@/auth";
import { dbConnection } from "@/lib/dbConnection";
import Api from "@/models/api.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest): Promise<NextResponse> =>{
    try{

        const session = await auth(request);
        
        if(!session){
            return NextResponse.json({
                message: "Unauthorized"
            },{
                status:401
            })
        }
        const url = new URL(request.url);
        const pageParam = url.searchParams.get('page');
        const page = pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : 1;
        
        await dbConnection();

        const limit = 6;
        const skip = (page - 1) * limit;
    
        const apis = await Api.find({},{avatar:1,title:1,description:1,updatedAt:1})
                                .skip(skip)
                                .limit(limit)
                                .sort({createdAt:-1})
                                .populate('author','username')
                                .populate('category','name');

        const total = await Api.countDocuments({});

        return NextResponse.json({
            apis,
            totalPages: Math.ceil(total / limit),
            totalApis : total,
        });
    }catch{
        return NextResponse.json(
            {
            error:"Failed to fetch user apis",
            }, {
                status : 500,
            }
        ); 
    }
}