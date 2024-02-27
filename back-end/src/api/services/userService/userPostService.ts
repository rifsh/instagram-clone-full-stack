import mongoose, { ObjectId } from "mongoose";
import { UserPostInterface } from "../../model/interfaces/userInterfaces";
import { postModel } from "../../model/schemas/postSchema";
import { userSignupModel } from "../../model/schemas/userSchema";


export const userAddPostSrvc = async (userId: string, postDetails: UserPostInterface): Promise<UserPostInterface> => {
    const userFinding = await userSignupModel.findById(userId);

    try {
        if (userFinding) {
            const addPost = new postModel({
                postedBy: userId,
                caption: postDetails.caption,
                image: postDetails.image,
                mediaType: postDetails.mediaType,
                hashtags: postDetails.hashtags
            })
            await addPost.save();
            return addPost
        } else {
            return
        }
    } catch (error) {
        console.log(error.message);

    }
}
export const getPostSrvc = async (): Promise<object> => {
    try {
        const posts = await postModel.find().populate({
            path: "postedBy",
            select: ["username", "profilePic"],
        })
        if (posts) {
            return posts
        } else {
            return
        }
    } catch (error) {
        console.log(error.message);

    }
}
export const getPostByidSrvc = async (postId: string): Promise<UserPostInterface> => {
    try {
        const postFinding = await postModel.findById(postId);
        if (postFinding) {
            return postFinding
        } else {
            return
        }
    } catch (error) {
        console.log(error.message);

    }
}
export const postLikeSrvc = async (postId: string, userId: string):Promise<boolean> => {
    const user: any = userId
    const post = await postModel.findById(postId);
    try {
        if (post.likes.includes(user)) {
            const index: any = post.likes.indexOf(user);
            post.likes.splice(index,1);
            post.save();
            return false;
        } else {
            const like = post.likes.push(user);
            post.save();
            return true;
        }
        // console.log(post.likes.includes(user));


    } catch (error) {
        console.log(error);
    }
}
export const deletePostSSrvc = async (postId: string): Promise<boolean> => {
    const postFinding = await postModel.findById(postId);
    try {
        if (postFinding) {
            const postDeleting = await postModel.findByIdAndDelete(postId);
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error.message);

    }
}

export const userPostService = {
    userAddPostSrvc,
    getPostSrvc,
    getPostByidSrvc,
    postLikeSrvc,
    deletePostSSrvc
}