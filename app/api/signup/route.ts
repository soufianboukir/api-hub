import { dbConnection } from "@/lib/dbConnection";
import User, { UserI } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try{
        const {name, email, password} : {name: string, email: string, password: string} = await request.json();
        await dbConnection();

        const userExists:UserI | null = await User.findOne({email:email});
        if(userExists){
            return NextResponse.json({
                message: 'User with this email is already exists!'
            },{
                status : 401,
            })
        }
        const hashedPassword:string = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });

        await newUser.save();
        return NextResponse.json({
            message: 'User created successfully!'
        },{
            status : 200, 
        });

    }catch {
        return NextResponse.json(
            {
            error:"Failed to create post",
            }, {
                status : 500,
            }
        ); 
    }
}