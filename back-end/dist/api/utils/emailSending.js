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
exports.sentMail = exports.otpEmailSend = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const otpEmailSend = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        let info = yield transporter.sendMail({
            from: 'rifshmuhammed@gmail.com',
            to: email,
            subject: `Your otp is ${otp}`,
            html: `
            <p>Please use this OTP to login</p>
        `
        });
        console.log('Email info: ', info);
        return info;
    }
    catch (error) {
        console.log(error);
    }
});
exports.otpEmailSend = otpEmailSend;
const sentMail = (email, text) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email);
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        let info = yield transporter.sendMail({
            from: 'rifshmuhammed@gmail.com',
            to: email,
            subject: text,
            html: `
            <p>You have requested a password reset for your account.</p>
            <p>Click the link below to reset your password:</p>
            <a href="http://localhost:4200/reset-password?token=ldsklksl">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
        `
        });
        console.log('Email info: ', info);
        return info;
    }
    catch (error) {
        console.log(error);
    }
});
exports.sentMail = sentMail;
exports.default = exports.sentMail;
