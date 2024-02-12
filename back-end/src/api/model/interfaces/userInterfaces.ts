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
    text:string;
    img:string;
    likes:[{
        userId:ObjectId
    }];
    replies:[{
        userId:ObjectId,
        text:string
    }];
    createdAt:Date;
    updatedAt:Date;
}