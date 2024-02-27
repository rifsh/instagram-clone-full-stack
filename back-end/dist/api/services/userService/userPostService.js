"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPostService = exports.deletePostSSrvc = exports.postLikeSrvc = exports.getPostByidSrvc = exports.getPostSrvc = exports.userAddPostSrvc = void 0;
const postSchema_1 = require("../../model/schemas/postSchema");
const userSchema_1 = require("../../model/schemas/userSchema");
const userAddPostSrvc = (userId, postDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const userFinding = yield userSchema_1.userSignupModel.findById(userId);
    try {
        if (userFinding) {
            const addPost = new postSchema_1.postModel({
                postedBy: userId,
                caption: postDetails.caption,
                image: postDetails.image,
                mediaType: postDetails.mediaType,
                hashtags: postDetails.hashtags
            });
            yield addPost.save();
            return addPost;
        }
        else {
            return;
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.userAddPostSrvc = userAddPostSrvc;
const getPostSrvc = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postSchema_1.postModel.find().populate({
            path: "postedBy",
            select: ["username", "profilePic"],
        });
        if (posts) {
            return posts;
        }
        else {
            return;
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getPostSrvc = getPostSrvc;
const getPostByidSrvc = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postFinding = yield postSchema_1.postModel.findById(postId);
        if (postFinding) {
            return postFinding;
        }
        else {
            return;
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getPostByidSrvc = getPostByidSrvc;
const postLikeSrvc = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = userId;
    const post = yield postSchema_1.postModel.findById(postId);
    try {
        if (post.likes.includes(user)) {
            const index = post.likes.indexOf(user);
            post.likes.splice(index, 1);
            post.save();
            return false;
        }
        else {
            const like = post.likes.push(user);
            post.save();
            return true;
        }
        // console.log(post.likes.includes(user));
    }
    catch (error) {
        console.log(error);
    }
});
exports.postLikeSrvc = postLikeSrvc;
const deletePostSSrvc = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const postFinding = yield postSchema_1.postModel.findById(postId);
    try {
        if (postFinding) {
            const postDeleting = yield postSchema_1.postModel.findByIdAndDelete(postId);
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.deletePostSSrvc = deletePostSSrvc;
exports.userPostService = {
    userAddPostSrvc: exports.userAddPostSrvc,
    getPostSrvc: exports.getPostSrvc,
    getPostByidSrvc: exports.getPostByidSrvc,
    postLikeSrvc: exports.postLikeSrvc,
    deletePostSSrvc: exports.deletePostSSrvc
};
