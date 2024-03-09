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
exports.userService = exports.userByIdSrvc = exports.userFollowingRemoveSrvc = exports.userFollowerRemoveSrvc = exports.userFollowingList = exports.userFollowersList = exports.userUnfollow = exports.userFollowingSrvc = exports.userProfileImgRemovesrvc = exports.userProfileImgChangeSrvc = exports.userProfileSrvc = exports.allUsers = void 0;
const userSchema_1 = require("../../model/schemas/userSchema");
const customeErrorHandler_1 = require("../../utils/customeErrorHandler");
const allUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = userSchema_1.userSignupModel.find({});
    return users;
});
exports.allUsers = allUsers;
const userProfileSrvc = (profileDetails, userId, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFinding = yield userSchema_1.userSignupModel.findById(userId);
    if (userFinding.username === profileDetails.username) {
        return next(new customeErrorHandler_1.CustomeError('Username is already present', 404));
    }
    try {
        if (!profileDetails) {
            return false;
        }
        else {
            const profileUpdated = yield userSchema_1.userSignupModel.findByIdAndUpdate(userId, {
                $set: {
                    fullname: profileDetails.fullname,
                    username: profileDetails.username,
                    profilePic: profileDetails.image,
                    links: profileDetails.links,
                    bio: profileDetails.bio,
                    gender: profileDetails.gender
                }
            }, { new: true });
            profileUpdated.save();
            return profileUpdated;
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.userProfileSrvc = userProfileSrvc;
const userProfileImgChangeSrvc = (userid, image) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.userSignupModel.findById(userid);
    try {
        if (!user) {
            return false;
        }
        else {
            const profilePic = yield userSchema_1.userSignupModel.findByIdAndUpdate(userid, { $set: { profilePic: image } });
            profilePic.save();
            return true;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userProfileImgChangeSrvc = userProfileImgChangeSrvc;
const userProfileImgRemovesrvc = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.userSignupModel.findById(userId);
    try {
        if (user) {
            const imgRemove = yield userSchema_1.userSignupModel.findByIdAndUpdate(userId, { $set: { profilePic: "https://imgs.search.brave.com/NLpgWA-anJ89n8ggNMg1F78gPFBzCLCKFaGd-SBIVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzA5LzU5Lzc1/LzM2MF9GXzUwOTU5/NzUzMl9SS1V1WXNF/UmhPRG1reGtaZDgy/cFNIbkZ0REF0Z2J6/Si5qcGc" } });
            imgRemove.save();
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.userProfileImgRemovesrvc = userProfileImgRemovesrvc;
const userFollowingSrvc = (followingId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followingUser = yield userSchema_1.userSignupModel.findById(followingId);
        const followerUser = yield userSchema_1.userSignupModel.findById(followerId);
        if (followingUser.following.includes(followerId)) {
            const index = followingUser.following.indexOf(followerId);
            followingUser.following.splice(index, 1);
            followingUser.save();
            const indexFollowers = followerUser.followers.indexOf(followerId);
            followerUser.followers.splice(indexFollowers, 1);
            followerUser.save();
            return false;
        }
        else {
            followingUser.following.push(followerId);
            followingUser.save();
            followerUser.followers.push(followingId);
            followerUser.save();
            return true;
        }
    }
    catch (error) {
        console.log(error);
    }
    // try {
    //     const followingUser = await userSignupModel.findById(followingId);
    //     const followerUser = await userSignupModel.findById(followerId);
    //     const followerFinding = await followingUser.following.includes(followerId);
    //     if (followerFinding) {
    //         return false;
    //     } else {
    //         if (followerUser && followerUser && !followerUser.followers.includes(followerId)) {
    //             followingUser.following.push(followerId);
    //             followingUser.save();
    //             followerUser.followers.push(followingId);
    //             followerUser.save();
    //             return true
    //         }
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
});
exports.userFollowingSrvc = userFollowingSrvc;
const userUnfollow = (followingId, followerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followingUser = yield userSchema_1.userSignupModel.findById(followingId);
        const followerUser = yield userSchema_1.userSignupModel.findById(followerId);
        if (followerUser && followerUser) {
            const index = followingUser.following.indexOf(followerId);
            followingUser.following.splice(index, 1);
            followingUser.save();
            const indexFollowers = followerUser.followers.indexOf(followerId);
            followerUser.followers.splice(indexFollowers, 1);
            followerUser.save();
            return true;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userUnfollow = userUnfollow;
const userFollowersList = (userId, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.userSignupModel.findById(userId);
    try {
        if (!user) {
            next(new customeErrorHandler_1.CustomeError('Something went wrong', 404));
        }
        else {
            const followrsList = yield userSchema_1.userSignupModel.findById(userId).populate({
                path: "followers",
                select: ["username", "profilePic", "fullname"],
            });
            return followrsList;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userFollowersList = userFollowersList;
const userFollowingList = (userId, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.userSignupModel.findById(userId);
    try {
        if (!user) {
            next(new customeErrorHandler_1.CustomeError('Something went wrong', 404));
        }
        else {
            const followrsList = yield userSchema_1.userSignupModel.findById(userId).populate({
                path: "following",
                select: ["username", "profilePic", "fullname"],
            });
            return followrsList;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userFollowingList = userFollowingList;
const userFollowerRemoveSrvc = (userId, removingId) => __awaiter(void 0, void 0, void 0, function* () {
    const follower = yield userSchema_1.userSignupModel.findById(userId);
    const following = yield userSchema_1.userSignupModel.findById(removingId);
    try {
        if (follower && following) {
            const followerIndex = follower.followers.indexOf(removingId);
            const followingIndex = following.following.indexOf(userId);
            follower.followers.splice(followerIndex, 1);
            follower.save();
            following.following.splice(followingIndex, 1);
            following.save();
            return true;
        }
        else {
            console.log('no user');
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userFollowerRemoveSrvc = userFollowerRemoveSrvc;
const userFollowingRemoveSrvc = (userId, removingId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.userSignupModel.findById(userId);
    const followingUser = yield userSchema_1.userSignupModel.findById(removingId);
    try {
        if (user && followingUser) {
            const userFollowingIndex = user.following.indexOf(removingId);
            const followerIndex = followingUser.followers.indexOf(userId);
            user.following.splice(userFollowingIndex, 1);
            user.save();
            followingUser.followers.splice(followerIndex, 1);
            followingUser.save();
            return true;
        }
        else {
            console.log('no user');
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userFollowingRemoveSrvc = userFollowingRemoveSrvc;
const userByIdSrvc = (usrId, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userSchema_1.userSignupModel.findById(usrId);
    if (!users) {
        next(new customeErrorHandler_1.CustomeError(`User is not present in the database with id '${usrId}' `, 404));
    }
    else {
        return users;
    }
});
exports.userByIdSrvc = userByIdSrvc;
exports.userService = {
    allUsers: exports.allUsers,
    userProfileSrvc: exports.userProfileSrvc,
    userProfileImgChangeSrvc: exports.userProfileImgChangeSrvc,
    userProfileImgRemovesrvc: exports.userProfileImgRemovesrvc,
    userFollowingSrvc: exports.userFollowingSrvc,
    userUnfollow: exports.userUnfollow,
    userFollowersList: exports.userFollowersList,
    userFollowingList: exports.userFollowingList,
    userFollowerRemoveSrvc: exports.userFollowerRemoveSrvc,
    userFollowingRemoveSrvc: exports.userFollowingRemoveSrvc,
    userByIdSrvc: exports.userByIdSrvc
};
