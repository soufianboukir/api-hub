import { auth } from "@/auth"
import Api from "@/models/api.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest):Promise<NextResponse> =>{
    try{
        const session = await auth();
        if(!session){
            return NextResponse.json({
                message: 'Unauthorized'
            },{
                status: 401
            })
        }

        const url = new URL(request.url);
        const query:string | null = url.searchParams.get('query');

        if(!query){
            return NextResponse.json({
                message: "Query is required!"
            },{
                status: 400
            })
        }

        const users = await User.find({
            $or: [
              { name: { $regex: query, $options: 'i' } },
              { username: { $regex: query, $options: 'i' } },
            ],
          }).limit(3);
      
        const apis = await Api.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        }).limit(3);

        return NextResponse.json({
            users,
            apis
        })
    }catch{
        return NextResponse.json({
            message: "Failed fetch data"
        },{
            status:500
        })
    }
}