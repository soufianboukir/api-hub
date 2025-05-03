import NextAuth, { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string;
  }
}