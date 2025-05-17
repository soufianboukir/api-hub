import mongoose, { models, ObjectId, Schema } from "mongoose";

export interface MessageI extends Document{
    sender: ObjectId,
    conversation: ObjectId,
    text: string,
    isRead: boolean,
}



const messageSchema = new Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    conversation: {type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true},
    text: {type: String, required: true},
    isRead: {type: Boolean, default: false}
},{
    timestamps: true
});

const Message = models.Message || mongoose.model<MessageI>('Message',messageSchema);
export default Message;