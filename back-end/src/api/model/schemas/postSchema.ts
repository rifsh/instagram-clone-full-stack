import mongoose from "mongoose";
import { UserPostInterface } from "../interfaces/userInterfaces";

const postSchema = new mongoose.Schema<UserPostInterface>({
    // User who created the post
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSignup',
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
    image: {
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
        ref: 'userSignup',
        default: []
    },
    // Comments on the post (optional)
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment',
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

export const postModel = mongoose.model('Post', postSchema); 