import mongoose, { ObjectId } from "mongoose";
import { PostComment, UserPostInterface } from "../../model/interfaces/userInterfaces";
import { postModel } from "../../model/schemas/postSchema";
import { userSignupModel } from "../../model/schemas/userSchema";
import postCommentModel from "../../model/schemas/commentSchema";


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
        }).populate({
            path: "likes",
            select: ["username", "profilePic"],
        }).populate({
            path: 'comments',
            select: ['text', 'author']
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
export const getPostByidSrvc = async (postId: string): Promise<UserPostInterface | boolean> => {
    try {
        const postFinding = await postModel.findById(postId);
        if (postFinding) {
            return postFinding
        } else {
            return false
        }
    } catch (error) {
        console.log(error.message);

    }
}
export const postLikeSrvc = async (postId: string, userId: string): Promise<any> => {
    const user: any = userId
    const post = await postModel.findById(postId).populate({
        path: "postedBy",
        select: ["username", "profilePic"],
    });
    try {
        if (post.likes.includes(user)) {
            const index: any = post.likes.indexOf(user);
            post.likes.splice(index, 1);
            post.save();
            return post;
        } else {
            const like = post.likes.push(user);
            post.save();
            return post;
        }
        // console.log(post.likes.includes(user));


    } catch (error) {
        console.log(error);
    }
}
export const addCommentSrvc = async (userId: string, postId: string, text: string): Promise<boolean> => {
    try {
        const userFind = await userSignupModel.findById(userId);
        const postFind = await postModel.findById(postId);
        if (!userFind || !postFind) {
            return false;
        }

        const addingComment = await postCommentModel.create({ text, post: postId, author: userId });
        addingComment.save();
        const addingCommentId = postFind.comments.push(addingComment.id);
        postFind.save();
        return true

    } catch (error) {
        console.log(error);
    }
}
export const viewPostComments = async (postId: string) => {
    try {
        const postFinding = await postModel.findById(postId);
        if (!postFinding) {
            return false
        }
        if (postFinding) {
            const comments = await postCommentModel.find({ post: postId }).populate({
                path: 'author',
                select: ['username', 'profilePic']
            })
            return comments
        }

    } catch (error) {
        console.log(error);
    }
}
export const deletePostSSrvc = async (userId: string, postId: string): Promise<boolean> => {
    const postFinding = await postModel.findById(postId);
    const userFind = await userSignupModel.findById(userId);

    try {
        if (postFinding && userFind) {
            const postDeleting = await postModel.findByIdAndDelete(postId);
            const commentFinding: PostComment[] = await postCommentModel.find({ post: postId });
            for (const i of commentFinding) {
                const commentDeleting = await postCommentModel.findOneAndDelete({ post: postId });
            }
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
    addCommentSrvc,
    viewPostComments,
    deletePostSSrvc
}