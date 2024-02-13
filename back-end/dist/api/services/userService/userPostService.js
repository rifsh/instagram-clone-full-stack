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
exports.userPostService = exports.getPostByid = exports.getPostSrvc = exports.userAddPostSrvc = void 0;
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
const getPostByid = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postFinding = yield postSchema_1.postModel.findById(postId);
        console.log(postFinding);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.getPostByid = getPostByid;
exports.userPostService = {
    userAddPostSrvc: exports.userAddPostSrvc,
    getPostSrvc: exports.getPostSrvc,
    getPostByid: exports.getPostByid
};
