import mongoose from "mongoose";
import { userSignupModel } from "./userSchema";
import { UserPostInterface } from "../interfaces/userInterfaces";


const schema = require('mongoose');

const postSchema = new mongoose.Schema({
    // User who created the post
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    // Caption of the post
    caption: {
        type: String,
        // required: true
    },
    // Media type (e.g., "image", "video")
    mediaType: {
        type: String,
        // required: true
    },
    // Media URL (e.g., image path, video link)
    mediaUrl: {
        type: String,
        // required: true
    },
    // Timestamp of post creation
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Hashtags associated with the post (optional)
    hashtags: {
        type: [String],
        default: []
    },
    // Likes received by the post
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    // Comments on the post (optional)
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        default: []
    },
    // Location associated with the post (optional)
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
});

module.exports = mongoose.model('Post', postSchema);


export const postModel = mongoose.model('post', schema); 