import { auth } from "@/auth";
import { dbConnection } from "@/lib/dbConnection";
import Api from "@/models/api.model";
import Category, { CategoryI } from "@/models/category.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    request: NextRequest,
    context: { params: Promise<{ categoryName: string }> }
  ): Promise<NextResponse> => {
    try {
        const session = await auth(request);
        if (!session) {
            return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
            );
        }
    
        const { categoryName } = await context.params; 
    
        await dbConnection();
        const category: CategoryI | null = await Category.findOne({name: categoryName});
        if(!category){
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }
    
        const url = new URL(request.url);
        const pageParam = url.searchParams.get('page');
        const page = pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : 1;
        
        const limit = 6;
        const skip = (page - 1) * limit;
    
        const apis = await Api.find({category: category._id}, {
            avatar: 1,
            title: 1,
            description: 1,
            updatedAt: 1,
        })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate('author', 'username')
            .populate('category', 'name');
    
        const total = await Api.countDocuments({category: category._id});
        return NextResponse.json({
            apis,
            totalPages: Math.ceil(total / limit),
            totalApis: total,
            category
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch API" },
            { status: 500 }
        );
    }
};
  

