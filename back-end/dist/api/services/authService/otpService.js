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
exports.otpService = exports.otpVerfying = exports.sentOtp = void 0;
const twilio_1 = __importDefault(require("twilio"));
const generateOtp_1 = __importDefault(require("../../utils/generateOtp"));
const otpSchema_1 = __importDefault(require("../../model/schemas/otpSchema"));
const userSchema_1 = require("../../model/schemas/userSchema");
const emailSending_1 = require("../../utils/emailSending");
const client = (0, twilio_1.default)(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const sentOtp = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.userSignupModel.findById(userId);
        const Otp = yield (0, generateOtp_1.default)();
        yield (0, emailSending_1.otpEmailSend)(user.email, Otp);
        const emailFinding = yield otpSchema_1.default.findOne({ email: user.email });
        if (emailFinding) {
            const updatingOtp = yield otpSchema_1.default.findOneAndUpdate({ email: user.email }, { $set: { otp: Otp } });
            updatingOtp.save();
            const userVerified = yield userSchema_1.userSignupModel.findOneAndUpdate({ email: user.email }, { $set: { isVerified: false } });
            userVerified.save();
        }
        else {
            const otpData = new otpSchema_1.default({ userID: userId, email: user.email, otp: Otp, otpExpared: new Date() });
            otpData.save();
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.sentOtp = sentOtp;
const otpVerfying = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userVerifying = yield userSchema_1.userSignupModel.findByIdAndUpdate(userId, { $set: { isVerified: true } });
    userVerifying.save();
    if (!userVerifying) {
        return false;
    }
    else {
        return true;
    }
});
exports.otpVerfying = otpVerfying;
exports.otpService = {
    sentOtp: exports.sentOtp,
    otpVerfying: exports.otpVerfying
};
