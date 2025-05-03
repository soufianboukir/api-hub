import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL as string;

export const dbConnection = async () =>{
    try{
        await mongoose.connect(mongoUrl);
        console.log('connected to db!')
    }catch{
        console.log('Failed to connect to db');
    }
}