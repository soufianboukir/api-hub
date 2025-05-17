import mongoose, { Document, models, ObjectId, Schema } from "mongoose";

interface NotificationI extends Document{
    fromUser: ObjectId,
    toUser: ObjectId,
    message: string,
    url?: string,
    isRead: boolean,
}

const notificationShema = new Schema<NotificationI>({
    fromUser : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    toUser: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    message: {type: String, required: true},
    url: {type: String},
    isRead: {type: Boolean, required: true, default: false},
},{
    timestamps: true
})


const Notification = models.Notification || mongoose.model<NotificationI>('Notification',notificationShema);
export default Notification;