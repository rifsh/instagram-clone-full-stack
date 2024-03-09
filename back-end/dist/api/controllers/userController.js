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
exports.userController = exports.profileImgRemove = exports.userFollowingRemove = exports.userFollowerRemove = exports.userFollowingList = exports.userFollowersList = exports.userUnfollow = exports.userFollowing = exports.profileImgChange = exports.userById = exports.userProfile = exports.allUser = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const userService_1 = require("../services/userService/userService");
const customeErrorHandler_1 = require("../utils/customeErrorHandler");
exports.allUser = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService_1.userService.allUsers();
    if (users) {
        res.status(200).json({
            status: "OK",
            datas: users
        });
    }
}));
exports.userProfile = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfileDetails = req.body;
    const datas = yield userService_1.userService.userProfileSrvc(req.body, req.params.id, next);
    if (datas) {
        res.status(200).json({
            message: 'Success',
            datas
        });
    }
    else {
        next(new customeErrorHandler_1.CustomeError('Something went wrong', 404));
    }
}));
exports.userById = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService_1.userService.userByIdSrvc(req.params.id, next);
    res.status(200).json({
        message: 'Successfully fetched user data.',
        datas: user
    });
}));
exports.profileImgChange = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const datas = yield userService_1.userService.userProfileImgChangeSrvc(req.params.id, req.body.image);
    if (datas) {
        res.status(200).json({
            Message: "Successfully updated"
        });
    }
    else {
        next(new customeErrorHandler_1.CustomeError('Something went wrong', 404));
    }
}));
exports.userFollowing = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const followingUserId = req.params.id;
    const followerUserId = req.body.followerId;
    const userFollow = yield userService_1.userService.userFollowingSrvc(followingUserId, followerUserId);
    if (userFollow) {
        res.status(200).json({
            message: "Following"
        });
    }
    else {
        res.status(200).json({
            message: "unFollowed"
        });
    }
    // const followingUserId: any = req.params.id;
    // const followerUserId: any = req.body.followerId;
    // const userFollow = await userService.userFollowingSrvc(followingUserId, followerUserId);
    // if (userFollow) {
    //     res.status(200).json({
    //         message: "Following"
    //     })
    // } else {
    //     next(new CustomeError('Something sent wrong', 404));    
    // }
}));
exports.userUnfollow = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const followingUserId: any = req.params.id;
    // const followerUserId: any = req.body.followerId;
    // const userUnfollowing = await userService.userUnfollow(followingUserId, followerUserId);
    // if (userUnfollowing) {
    //     res.status(200).json({
    //         message: "Unfollowed"
    //     })
    // }
}));
exports.userFollowersList = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const datas = yield userService_1.userService.userFollowersList(userId, next);
    res.status(200).json({
        message: "OK",
        datas
    });
}));
exports.userFollowingList = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const datas = yield userService_1.userService.userFollowingList(userId, next);
    res.status(200).json({
        message: "OK",
        datas
    });
}));
exports.userFollowerRemove = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const removingId = req.body.followerId;
    const values = yield userService_1.userService.userFollowerRemoveSrvc(userId, removingId);
    if (values) {
        res.status(200).json({
            message: "Removed"
        });
    }
    else {
        res.status(404).json({
            message: "Something went wrong"
        });
    }
}));
exports.userFollowingRemove = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const removingId = req.body.followingUser;
    const values = yield userService_1.userService.userFollowingRemoveSrvc(userId, removingId);
    if (values) {
        res.status(200).json({
            message: "Removed"
        });
    }
    else {
        res.status(404).json({
            message: "Something went wrong"
        });
    }
}));
exports.profileImgRemove = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService_1.userService.userProfileImgRemovesrvc(req.params.id);
    if (result) {
        res.status(200).json({
            Message: "Successfully Removed"
        });
    }
    else {
        next(new customeErrorHandler_1.CustomeError('Something went wrong', 404));
    }
}));
exports.userController = {
    allUser: exports.allUser,
    userProfile: exports.userProfile,
    profileImgChange: exports.profileImgChange,
    profileImgRemove: exports.profileImgRemove,
    userFollowing: exports.userFollowing,
    userUnfollow: exports.userUnfollow,
    userFollowersList: exports.userFollowersList,
    userFollowingList: exports.userFollowingList,
    userFollowerRemove: exports.userFollowerRemove,
    userFollowingRemove: exports.userFollowingRemove,
    userById: exports.userById
};
