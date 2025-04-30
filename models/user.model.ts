import { UserI } from "@/types";
import mongoose, { models, Schema } from "mongoose";




const userSchema = new Schema<UserI>({
    name : {type: String, required: true},
    email : {
        type: String,
        required : [true, "Email is required"],
        unique : true
    },
    password : {
        type: String,
        required : true,
    },
    profile_picture : {type: String},
    bio : {type: String}
},{
    timestamps:true
});

const User = models.User ||  mongoose.model<UserI>("User",userSchema)
export default User;
