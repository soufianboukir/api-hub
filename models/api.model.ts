import mongoose, { Document, type ObjectId, Schema } from "mongoose";

type EndPoint = {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    description: string,
}

type Review = {
    authorId: string,
    review: string,
}

interface apiI extends Document{
    authorId: ObjectId,
    categoryId: ObjectId,
    title: string,
    description: string,
    endPoints?: EndPoint[],
    githubLink?: string,
    gitLabLink?: string,
    documentationUrl?: string,
    reviews?: Review[],
}



const apiShema = new Schema<apiI>({
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
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
})