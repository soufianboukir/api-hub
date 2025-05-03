import mongoose, { Document, models, Schema } from "mongoose";

export interface CategoryI extends Document {
    name: string, 
    description: string,
    emoji?: string,
}

const categoryShema = new Schema<CategoryI>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    emoji: {type: String},
},{
    timestamps: true
});

const Category = models?.Category || mongoose.model<CategoryI>('Category',categoryShema)
export default Category;