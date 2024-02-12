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
const phoneValidation_1 = __importDefault(require("../../utils/phoneValidation"));
const generateOtp_1 = __importDefault(require("../../utils/generateOtp"));
const otpSchema_1 = __importDefault(require("../../model/schemas/otpSchema"));
const userSchema_1 = require("../../model/schemas/userSchema");
const client = (0, twilio_1.default)(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const sentOtp = (userId, phNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, phoneValidation_1.default)(phNumber)) {
            return false;
        }
        else {
            const Otp = yield (0, generateOtp_1.default)();
            const numberFinding = yield otpSchema_1.default.findOne({ phoneNumber: `+91${phNumber}` });
            if (numberFinding) {
                const updatingOtp = yield otpSchema_1.default.findOneAndUpdate({ phoneNumber: `+91${phNumber}` }, { $set: { otp: Otp } });
                updatingOtp.save();
                // return updatingOtp
            }
            else {
                const otpData = new otpSchema_1.default({ userID: userId, phoneNumber: `+91${phNumber}`, otp: Otp, otpExpared: new Date() });
                otpData.save();
            }
            // otp send to twilio
            yield client.messages.create({
                body: `${Otp} this is your otp, it will expires in 4 minutes`,
                from: '+17163033405',
                to: `+91${phNumber}`
            });
            return true;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
    // try {
    //     const transporter = nodemailer.createTransport({
    //         host: 'sandbox.smtp.mailtrap.io',
    //         port: 2525,
    //         auth: {
    //             user: 'ef704883df0cbb',
    //             pass: 'eeef2dc98a8440'
    //         }
    //     })
    //     const mailOptions = {
    //         from: 'rifashrifah617@gmail.com',
    //         to: phNumber,
    //         subject: `Your ot is ${otpGenerate}`,
    //         text:"Sending"
    //     }
    //     await transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             console.log(error.message);
    //         } else {
    //             console.log("Email has been sent", info.response);
    //         }
    //     })
    // } catch (error) {
    //     console.log(error.message);
    // }
});
exports.sentOtp = sentOtp;
const otpVerfying = (phNUmber) => __awaiter(void 0, void 0, void 0, function* () {
    const userVerifying = yield userSchema_1.userSignupModel.findOneAndUpdate({ phone: `+91${phNUmber}` }, { $set: { isVerified: true } });
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
    sentEmail: exports.sentOtp,
    otpVerfying: exports.otpVerfying
};
