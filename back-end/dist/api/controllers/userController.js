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
exports.userController = exports.profileImgRemove = exports.profileImgChange = exports.userById = exports.userProfile = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const userService_1 = require("../services/userService/userService");
const customeErrorHandler_1 = require("../utils/customeErrorHandler");
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
        status: 'success',
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
    userProfile: exports.userProfile,
    profileImgChange: exports.profileImgChange,
    profileImgRemove: exports.profileImgRemove,
    userById: exports.userById
};
