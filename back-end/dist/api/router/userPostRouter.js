"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const imageUploading_1 = require("../middlewares/imageUploading");
const userPostController_1 = require("../controllers/userPostController");
exports.postRouter = express_1.default.Router();
exports.postRouter
    // .use(userRouteProtector)
    .post('/add-post/:id', imageUploading_1.userAddPostimgUpload, userPostController_1.userPostController.userAddPost)
    .get('/get-post', userPostController_1.userPostController.getPost)
    .get('/get-post-byId/:id', userPostController_1.userPostController.getPostById)
    .post('/like-post/:id', userPostController_1.userPostController.likePost)
    .post('/add-comment/:id', userPostController_1.userPostController.addComment)
    .get('/post-comment/:id', userPostController_1.userPostController.addComment)
    .delete('/delete-post/:id', userPostController_1.userPostController.deletePost);
