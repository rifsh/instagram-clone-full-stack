"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const routeProtectorMiddleware_1 = require("../middlewares/routeProtectorMiddleware");
const imageUploading_1 = require("../middlewares/imageUploading");
exports.userRouter = express_1.default.Router();
exports.userRouter
    .use(routeProtectorMiddleware_1.userRouteProtector)
    .put('/user-profile/:id', imageUploading_1.userProfileimgUpload, userController_1.userController.userProfile)
    .post('/add-post/:id', imageUploading_1.userAddPostimgUpload, userController_1.userController.userAddPost);
