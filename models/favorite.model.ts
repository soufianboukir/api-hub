import mongoose, { Document, models, type ObjectId, Schema } from "mongoose";

interface FavoriteApiI extends Document{
    user: ObjectId,
    api: ObjectId,
}

const favoritApiSchema = new Schema<FavoriteApiI>({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    api: {type: mongoose.Schema.Types.ObjectId, ref: "Api"},
},{
    timestamps: true
});

const FavoriteApi = models.FavoriteApi || mongoose?.model<FavoriteApiI>("FavoriteApi",favoritApiSchema);
export default FavoriteApi;