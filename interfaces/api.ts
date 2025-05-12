import { EndPoint, Review } from "@/models/api.model";
import { type StaticImageData } from "next/image";

export interface ApiForm {
    authorId?: string,
    categoryId: string,
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
