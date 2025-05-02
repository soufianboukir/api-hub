import mongoose, { Document, models, Schema } from "mongoose";

export interface UserI extends Document{
    name: string,
    email: string,
    username: string,
    password: string,
    bio: string,
    profile_picture: string,
    bg_picture: string,
}


const userSchema = new Schema<UserI>({
    name : {type : String,required: true},
    email : {type : String,required: true},
    username : {type : String},
    password: {type : String},
    bio : {type : String},
    profile_picture : {type : String},
    bg_picture : {type : String},
},
{
    timestamps: true
});

const User = models.User || mongoose.model<UserI>('User',userSchema);
export default User;