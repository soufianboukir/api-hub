import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const POST = async (request: NextRequest): Promise<NextResponse> =>{
    try{
        const formData = await request.formData();
        
        const file = formData.get('file') as File;
        const username = formData.get('username') as string;
        const type = formData.get('type') as 'profile' | 'background';

        if(!file || !type || !username){
            return NextResponse.json({
                error:"Failed to upload picture",
            },{
                status:400
            })
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        const filename = `${type}-${Date.now()}-${file.name}`;
        const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);

        await writeFile(uploadPath, buffer);

        return NextResponse.json({
            message: `${type} picture updated successfully!`,
        })
    }catch{
        return NextResponse.json(
            {
                error:"Failed to upload picture",
            }, {
                status : 500,
            }
        );
    }
}