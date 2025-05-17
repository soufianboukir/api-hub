import { ApiI } from "@/models/api.model";
import { UserI } from "@/models/user.model";

export interface Conversation {
    _id: string,
    participants : UserI[],
    lastMessage: string,
    updatedAt: string,
    api: ApiI
}

export interface Message {
    _id: string, 
    sender: UserI,
    text: string,
    isRead?: boolean
}