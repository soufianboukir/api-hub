import NextAuth from "next-auth";
import { UserI } from "@/models/user.model"; 

declare module "next-auth" {
  interface Session {
    user: UserI;
  }

  interface User {
    id: string
    name: string
    email: string
    username: string
    defaultColor: string
    profile_picture?: string
    bg_picture?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}