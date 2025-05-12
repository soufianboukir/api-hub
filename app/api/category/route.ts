import { dbConnection } from "@/lib/dbConnection";
import Category from "@/models/category.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest): Promise<NextResponse> =>{
    try{
        const url = new URL(request.url);
        const limitParam = url.searchParams.get('limit');
        const limit: number = limitParam ? parseInt(limitParam) : 1000;

        await dbConnection();
        const categories = await Category.find({}).limit(limit);

        if(categories){
            return NextResponse.json(
                {
                    categories
                }, {
                    status : 200,
                }
            ); 
        }
        return NextResponse.json(
            {
                error:"No category available"
            }, {
                status : 500,
            }
        ); 
    }catch{
        return NextResponse.json(
            {
            error:"Failed to get categories",
            }, {
                status : 500,
            }
        ); 
    }
}