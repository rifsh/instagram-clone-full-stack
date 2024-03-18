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
const emailSending_1 = require("../utils/emailSending");
const authService_ts_1 = require("../services/authService/authService.ts");
const customeErrorHandler_1 = require("../utils/customeErrorHandler");
const token_1 = require("../utils/token");
exports.userOtpSend = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const sentOtp = yield otpService_1.otpService.sentOtp(req.params.id);
        res.status(200).json({
            status: "OK",
            message: "OTP send successfully",
            datas
        });
    }
    else {
        next(new customeErrorHandler_1.CustomeError('User is not found', 404));
    }
}));
const userPhoneNumberChange = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const changedValue = yield authService_ts_1.userAuthService.phoneNumberCahngeSrvc(req.params.id, req.body.phone);
    if (changedValue) {
        res.status(200).json({
            status: "OK",
            message: "Number changed successfully"
        });
    }
    else {
        res.status(404).json({
            status: "Invalid",
            message: "Something went wrong"
        });
    }
}));
const otpSending = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = yield authService_ts_1.userAuthService.userOtpSendingSrvc(req.params.id);
    // if (otp) {
    //     res.status(200).json({
    //         status: "OK",
    //         message: "OTP send successfully",
    //     })
    // } else {
    //     next(new CustomeError('User is not found', 404));
    // }
}));
const userLogin = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const datas = yield authService_ts_1.userAuthService.userLoginSrvc(res, req.body);
    if (datas) {
        const token = (0, token_1.userToken)(datas);
        res.status(200).json({
            message: "Success",
            datas,
            token
        });
    }
    else {
        res.status(404).json({
            message: 'Username or password is incorrect'
        });
    }
}));
const userPaaswordReseting = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const prevPassword = req.body.prevPassword;
    const newPassword = req.body.password;
    const cahnged = yield authService_ts_1.userAuthService.userPasswordResetingSrvc(userId, prevPassword, newPassword);
    if (cahnged) {
        res.status(200).json({
            message: "Password changed"
        });
    }
    else {
        res.status(200).json({
            message: "Entered password is not match"
        });
    }
}));
const userForgotPassword = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, emailSending_1.sentMail)(req.body.email);
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
    userPhoneNumberChange,
    otpSending,
    userLogin,
    userPaaswordReseting,
    userForgotPassword,
    userDelting
};
