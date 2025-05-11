import mongoose, { type Document, models, type ObjectId, Schema } from "mongoose";

type EndPoint = {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    description: string,
}

type Review = {
    authorId: string,
    review: string,
}

interface ApiI extends Document{
    authorId: ObjectId,
    categoryId: ObjectId,
    avatar: string,
    title: string,
    description: string,
    endPoints?: EndPoint[],
    githubLink?: string,
    gitLabLink?: string,
    documentationUrl?: string,
    reviews?: Review[],
}



const apiShema = new Schema<ApiI>({
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    avatar: {type: String, required: true},
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    endPoints : [
        {
            url: {
                type: String,
                required: true
            },
            description: {
                type: String,
            }
        }
    ],
    githubLink: {
        type: String
    },
    gitLabLink: {
        type: String
    },
    documentationUrl:{
        type: String,
    },
    reviews : [
        {
            authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
            review: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const Api = models.Api || mongoose.model<ApiI>('Api',apiShema);
export default Api;