"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    // User who created the post
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    // Comments on the post (optional)
    comments: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
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
exports.postModel = mongoose_1.default.model('Post', postSchema);
