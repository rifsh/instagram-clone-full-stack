import mongoose, { Schema } from "mongoose";
import { PostComment } from "../interfaces/userInterfaces";

const schema = new mongoose.Schema<PostComment>({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'userSignup',
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'postModel',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: 'userSignup',
        default: [],
    },
})

const postCommentModel = mongoose.model('comment', schema);

export default postCommentModel;