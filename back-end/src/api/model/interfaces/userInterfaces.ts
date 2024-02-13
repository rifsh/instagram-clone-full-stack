import { ObjectId } from "mongoose";

export interface UserProfileInterface {
    image:string
    fullname:string;
    username:string;
    bio:string;
    links:string;
    gender:string;

}

export interface UserPostInterface {
    postedBy:ObjectId;
    caption:string;
    mediaType:string;
    image:string;
    hashtags:[string];
    likes:[ObjectId];
    comments:[ObjectId];
    createdAt:Date;
    updatedAt:Date;
    location:{
        type:string,
        coordinates:[string]
    }
}