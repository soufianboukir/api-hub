import { auth } from "@/auth";
import { fetchUserApis } from "@/controllers/apiApp.controller";
import { dbConnection } from "@/lib/dbConnection";
import User from "@/models/user.model";
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
        const username = url.searchParams.get('username');

        
        await dbConnection();
        const user = await User.findOne({username});
        if(!user){
            return NextResponse.json(
                {
                    error:"User not found"
                }, {
                    status : 404,
                }
            ); 
        }

        const response = await fetchUserApis(user._id.toString(),page);
        if(response.success){
            return NextResponse.json(
                {
                    apis:response.apis,
                    totalApis: response.totalApis,
                    totalPages: response.totalPages,
                }); 
        }
        
        return NextResponse.json(
            {
            error:"Failed to fetch user apis",
            }, {
                status : 500,
            }
        ); 
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