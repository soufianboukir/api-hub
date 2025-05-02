import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { dbConnection } from "./lib/db/dbConnection"
import User, { UserI } from "./models/user.model"
import bcrypt from "bcryptjs"
 
type Credentials = {
    email: string,
    password: string,
}

type ReturnedUser = {
    id: string,
    name: string,
    email: string,
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    response_type: "code"
                }
            }
        }),
        Credentials({
            name: "credentials",
            credentials:{
                email : {label:'email', type:'email'},
                password: {label:'password', type:'password'}
            },

            async authorize(credentials): Promise<ReturnedUser>{
                await dbConnection();
                const {email, password} = credentials as Credentials;
                const user:UserI | null = await User.findOne({email:email});
                if(!user) {
                    throw new Error("Email or password incorrect")
                }
                
                const passwordsMatched:boolean = await bcrypt.compare(password,user.password);
                if(!passwordsMatched){
                    throw new Error("Email or password incorrect")
                }

                return {
                    id: user._id as string,
                    name: user.name,
                    email: user.email,
                };
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn:"/signIn",
        error:"/signIn",
    },
    callbacks:{
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                await dbConnection();
                const existingUser = await User.findOne({ email: profile?.email });

                if (existingUser) {
                    user.id = existingUser._id.toString();
                } else {
                    const newUser = await User.create({
                        name: profile?.name,
                        email: profile?.email,
                        profile_picture: profile?.image
                    });
                    user.id = newUser._id.toString();
                }
            }
            return true;
        },
        async jwt({token,user}){
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session,token}){
            if (token) {
                session.id = token.id
            }
            return Promise.resolve(session);
        }
    },
    secret : process.env.NEXTAUTH_SECRET
})