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
exports.userService = exports.userByIdSrvc = exports.userProfileImgRemovesrvc = exports.userProfileImgChangeSrvc = exports.userProfileSrvc = void 0;
const userSchema_1 = require("../../model/schemas/userSchema");
const customeErrorHandler_1 = require("../../utils/customeErrorHandler");
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
    userProfileSrvc: exports.userProfileSrvc,
    userProfileImgChangeSrvc: exports.userProfileImgChangeSrvc,
    userProfileImgRemovesrvc: exports.userProfileImgRemovesrvc,
    userByIdSrvc: exports.userByIdSrvc
};
