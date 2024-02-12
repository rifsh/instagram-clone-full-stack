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
exports.UserAuthController = exports.userOtpSend = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const otpService_1 = require("../services/authService/otpService");
const authService_ts_1 = require("../services/authService/authService.ts");
const customeErrorHandler_1 = require("../utils/customeErrorHandler");
exports.userOtpSend = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = req.body;
    const datas = yield authService_ts_1.userAuthService.userSighnupSrvc(userDetails);
    if (!datas) {
        res.json({
            status: 404,
            message: "Something went wrong"
        });
    }
    else {
        res.json({
            status: 200,
            message: "User created successfully",
            datas
        });
    }
}));
const userDob = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userDob = req.body;
    const datas = yield authService_ts_1.userAuthService.userDobSrvc(userDob, req.params.id, req.params.phone);
    if (datas) {
        const sentOtp = yield otpService_1.otpService.sentEmail(req.params.id, req.params.phone);
        res.status(200).json({
            status: "Success",
            datas
        });
    }
    else {
        next(new customeErrorHandler_1.CustomeError('User is not found', 404));
    }
}));
const userLogin = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const datas = yield authService_ts_1.userAuthService.userLoginSrvc(res, req.body);
    console.log(datas);
    if (datas) {
        res.status(200).json({
            message: "Success",
            token: datas
        });
    }
    else {
        res.status(404).json({
            message: 'Username or password is incorrect'
        });
    }
}));
const userDelting = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const userDeleting = authService_ts_1.userAuthService.userDeletingSrvc(userId);
    if (userDeleting) {
        res.status(200).json({
            status: "OK"
        });
    }
    else {
        next(new customeErrorHandler_1.CustomeError('Something went wrong', 404));
    }
}));
exports.UserAuthController = {
    userOtpSend: exports.userOtpSend,
    userDob,
    userLogin,
    userDelting
};
