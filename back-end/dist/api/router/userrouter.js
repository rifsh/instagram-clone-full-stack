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
    .get('/users', userController_1.userController.allUser)
    .get('/user-by-id/:id', userController_1.userController.userById)
    .put('/user-profile/:id', userController_1.userController.userProfile)
    .put('/user-profile-img/:id', imageUploading_1.userProfileimgUpload, userController_1.userController.profileImgChange)
    .post('/user-following/:id', userController_1.userController.userFollowing)
    .delete('/user-profile-remove/:id', userController_1.userController.profileImgRemove);
