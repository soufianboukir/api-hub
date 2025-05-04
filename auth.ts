import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import User, { UserI } from "./models/user.model"
import bcrypt from "bcryptjs"
import { dbConnection } from "./lib/dbConnection"
import { generateRandomColor, generateUniqueUsername } from "./constants"
 
type Credentials = {
    email: string,
    password: string,
}

type ReturnedUser = {
    id: string,
    name: string,
    defaultColor: string,
    email: string,
    username: string
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
                    defaultColor: user.defaultColor,
                    name: user.name,
                    email: user.email,
                    username: user.username
                };
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn:"/auth/signIn",
        error:"/auth/signIn",
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
                        defaultColor: generateRandomColor(),
                        profile_picture: profile?.image,
                        username : generateUniqueUsername(profile?.name),
                    });
                    user.id = newUser._id.toString();
                }
            }
            return true;
        },
        async jwt({token,user}){
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({session,token}){
            if (token?.user) {
                session.user = token.user as typeof session.user; 
            }
            return session;
        }
    },
    secret : process.env.NEXTAUTH_SECRET
})