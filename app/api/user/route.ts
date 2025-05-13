import { dbConnection } from "@/lib/dbConnection";
import User, { UserI } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest): Promise<NextResponse> =>{
    try{
        const url = new URL(request.url);
        const username: string = url.searchParams.get('username') ?? '';
        
        await dbConnection();
        const user:UserI | null = await User.findOne(
                        {username},
                        {username:1,
                            profile_picture:1,
                            bg_picture:1,
                            defaultColor:1
                        });
        if(user){
            return NextResponse.json({user});
        }

        return NextResponse.json({
            message:"Cannot find the user"
        },{
            status:404
        });
    }catch{
        return NextResponse.json(
            {
            error:"Failed to fetch User Data",
            }, {
                status : 500,
            }
        );
    }
}