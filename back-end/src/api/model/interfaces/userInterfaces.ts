import { ObjectId } from "mongoose";

export interface UserProfileInterface {
    image: string
    fullname: string;
    username: string;
    bio: string;
    links: string;
    gender: string;

}

export interface UserPostInterface {
    postedBy: ObjectId;
    caption: string;
    mediaType: string;
    image: string;
    hashtags: [string];
    likes: [ObjectId];
    comments: [ObjectId];
    createdAt: Date;
    updatedAt: Date;
    location: {
        type: string,
        coordinates: [string]
    }
}

export interface PostComment {
    text: string;
    author: ObjectId; // User ID (reference to User model)
    post: ObjectId; // Post ID (reference to Post model)
    date: Date;
    likes: ObjectId[]; // Array of user IDs who liked the comment
}