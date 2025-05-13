import { EndPoint, Review } from "@/models/api.model";
import { type StaticImageData } from "next/image";

export interface ApiForm {
    author?: string,
    category: string,
    avatar: StaticImageData,
    title: string,
    description: string,
    endpoints?: EndPoint[],
    baseUrl?: string,
    github?: string,
    gitlab?: string,
    documentation?: string,
    reviews?: Review[],
}

export interface SimplifiedApi {
    _id: string,
    title: string,
    description: string,
    avatar: string,
    updatedAt: string,
    author : {
        _id: string,
        username: string,
    },
    category : {
        _id: string,
        name: string,
    } 
}