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
exports.UserController = exports.userOtpSend = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const otpService_1 = require("../services/authService/otpService");
const authService_ts_1 = require("../services/authService/authService.ts");
const token_1 = require("../utils/token");
exports.userOtpSend = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = req.body;
    const userId = req.params.id;
    const sentOtp = yield otpService_1.otpService.sentEmail(userId, userDetails.emailOrPhone);
    if (sentOtp) {
        // await userService.userRegSrvc(userDetails, next);
        const datas = yield authService_ts_1.userService.userSighnupSrvc(userDetails, next);
        // const token = userSignupToken();
        res.json({
            status: 200,
            message: "Otp sent successfully"
        });
    }
    else {
        res.json({
            status: 404,
            message: "Something went wrong"
        });
    }
}));
const userRegistration = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userValues = req.body;
    const verfiedUser = yield authService_ts_1.userService.userRegistration(userValues, req.params.id);
    if (verfiedUser) {
        const token = (0, token_1.userToken)();
        res.status(200).json({
            status: "OK",
            message: "User created successfully",
            token
        });
    }
    else {
        res.json({
            status: 404,
            message: "User is not verified"
        });
    }
}));
const userLogin = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userValues = req.body;
    const token = yield authService_ts_1.userService.userLoginSrvc(userValues, next);
    if (token) {
        res.status(200).json({
            status: "OK",
            message: "Successfully logged",
            token
        });
    }
}));
exports.UserController = {
    userOtpSend: exports.userOtpSend,
    userRegistration,
    userLogin
};
