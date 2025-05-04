import NextAuth from "next-auth";
import { UserI } from "@/models/user.model"; 

declare module "next-auth" {
  interface Session {
    user: UserI;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserI;
  }
}