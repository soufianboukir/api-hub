import { auth } from "@/auth";
import { dbConnection } from "@/lib/dbConnection";
import Api from "@/models/api.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: {params: {apiId: string}}):
 Promise<NextResponse> =>{
    try{
        const session = await auth(request);
        if(!session){
            return NextResponse.json({
                message: "Unauthorized"
            },{
                status:401
            })
        }

        const { apiId } = params;
        await dbConnection();
        const api = await Api.findById(apiId)
                            .populate('author')
                            .populate('category')
        
        if(api){
            return NextResponse.json({
                api
            })
        }
        return NextResponse.json({
            message: "Api not found"
        },{
            status:404
        })
    }catch{
        return NextResponse.json(
            {
                error:"Failed to fetch api",
            }, {
                status : 500,
            }
        ); 
    }
}


export async function PUT(request: Request, { params } : { params: { apiId: string } }) {
    try {
        const session = await auth();
        if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { apiId } = await params;
        await dbConnection();

        const api = await Api.findOne({
            _id: apiId,
            author: session.user.id,
        });

        if (!api) {
            return NextResponse.json({ message: "API not found" }, { status: 404 });
        }

        const formData = await request.json();
        const avatarUrl = typeof formData.avatar === "object" ? formData.avatar.src : formData.avatar;

        
        await Api.findByIdAndUpdate(apiId, {
            title: formData.title,
            category: formData.category,
            avatar: avatarUrl,
            description: formData.description,
            baseUrl: formData.baseUrl,
            endPoints: formData.endpoints,
            githubLink: formData.github,
            gitLabLink: formData.gitlab,
            documentationUrl: formData.documentation,
        });

        return NextResponse.json({ message: "API updated successfully." });
    } catch {
        return NextResponse.json(
            { message: "Failed to update API" },
            { status: 500 }
        );
    }
}
