import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { User as UserInterface } from "@/types/index"
import { dbConnection } from "./lib/db/dbConnection"
import User from "./models/user.model"
import bcrypt from "bcryptjs"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        Credentials({
            name:"credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<UserInterface | null>{
                try{  
                    await dbConnection();
                    const user = await User.findOne({email:credentials?.email});
                    if(!user){
                        throw new Error("Email or password incorrect");
                    }

                    const correctedPass:boolean = await bcrypt.compare(credentials?.password as string
                            ,user.password);
                    if(!correctedPass){
                        throw new Error("Email or password incorrect");
                    }

                    return user;
                }catch{
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    session:{
        strategy:"jwt"
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({ session, token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
})