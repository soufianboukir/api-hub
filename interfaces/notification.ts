import { UserI } from "@/models/user.model";

export interface Notification {
    _id: string,
    toUser: UserI,
    fromUser: UserI,
    message: string,
    url: string,
    isRead: boolean,
    createdAt: string
}