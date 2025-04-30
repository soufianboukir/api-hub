import { Document } from "mongoose";


export interface UserI extends Document{
    name: string,
    email: string,
    password : string,
    profile_picture: string,
    bio: string,
    createdAt: string,
    updatedAt : string,
}

export interface User{
    name: string,
    email: string,
    password? : string,
    profile_picture?: string,
    bio?: string,
    createdAt?: string,
    updatedAt?: string,
}