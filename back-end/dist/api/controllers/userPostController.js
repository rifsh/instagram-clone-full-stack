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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPostController = exports.deletePost = exports.postComments = exports.addComment = exports.likePost = exports.getPostById = exports.getPost = exports.userAddPost = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const userPostService_1 = require("../services/userService/userPostService");
exports.userAddPost = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datas = yield userPostService_1.userPostService.userAddPostSrvc(req.params.id, req.body);
    if (datas) {
        res.status(200).json({
            message: "Success",
            datas
        });
    }
    else {
        res.status(404).json({
            message: "Something went wrong"
        });
    }
}));
exports.getPost = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datas = yield userPostService_1.userPostService.getPostSrvc();
    if (datas) {
        res.status(200).json({
            message: "Success",
            datas
        });
    }
    else {
        res.status(404).json({
            message: "Something went wrong"
        });
    }
}));
exports.getPostById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datas = yield userPostService_1.userPostService.getPostByidSrvc(req.params.id);
    if (datas) {
        res.status(200).json({
            message: "Success",
            datas
        });
    }
    else {
        res.status(404).json({
            message: "Something went wrong"
        });
    }
}));
exports.likePost = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const like = yield userPostService_1.userPostService.postLikeSrvc(postId, req.body.userId);
    if (like) {
        res.status(200).json({
            message: "Liked"
        });
    }
    else {
        res.status(200).json({
            message: "Like removed"
        });
    }
}));
exports.addComment = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const postId = req.body.postId;
    const text = req.body.text;
    const comment = yield userPostService_1.userPostService.addCommentSrvc(userId, postId, text);
    if (comment) {
        res.status(200).json({
            message: "Commented"
        });
    }
    else {
        res.status(404).json({
            message: "Something went wrong"
        });
    }
}));
exports.postComments = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const datas = yield userPostService_1.userPostService.viewPostComments(postId);
    if (datas) {
        res.status(200).json({
            message: "OK",
            datas
        });
    }
    else {
        res.status(404).json({
            message: "Something went wrong"
        });
    }
}));
exports.deletePost = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postDeleting = yield userPostService_1.userPostService.deletePostSSrvc(req.params.id);
    if (postDeleting) {
        res.status(200).json({
            message: "Successfully removed",
        });
    }
    else {
        res.status(404).json({
            message: "Error deleting a post"
        });
    }
}));
exports.userPostController = {
    userAddPost: exports.userAddPost,
    getPost: exports.getPost,
    getPostById: exports.getPostById,
    likePost: exports.likePost,
    addComment: exports.addComment,
    postComments: exports.postComments,
    deletePost: exports.deletePost
};
