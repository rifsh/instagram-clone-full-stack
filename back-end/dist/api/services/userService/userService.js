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
exports.userService = exports.userAddPostSrvc = exports.userProfileSrvc = void 0;
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
const userAddPostSrvc = (userId, postDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(postDetails.img);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.userAddPostSrvc = userAddPostSrvc;
exports.userService = {
    userProfileSrvc: exports.userProfileSrvc,
    userAddPostSrvc: exports.userAddPostSrvc
};
