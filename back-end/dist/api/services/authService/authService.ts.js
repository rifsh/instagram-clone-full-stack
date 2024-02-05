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
exports.userService = void 0;
const userSignupSchema_1 = require("../../model/schemas/userSignupSchema");
const customeErrorHandler_1 = require("../../utils/customeErrorHandler");
const otpSchema_1 = __importDefault(require("../../model/schemas/otpSchema"));
const token_1 = require("../../utils/token");
// import { userRegistrationModel } from "../../model/schemas/userRegistrationSchema";
const userSighnupSrvc = (userDetails, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (userDetails) {
            const userDetail = yield userSignupSchema_1.userSignupModel.create({ password: userDetails.password, emailOrPhone: userDetails.emailOrPhone });
            return userDetail;
        }
    }
    catch (err) {
        next(new customeErrorHandler_1.CustomeError('User details required', 303));
    }
});
const userOtpValidationSrvc = (phNUmber, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phNum = `+91${phNUmber}`;
        const validation = yield otpSchema_1.default.findOne({ phoneNumber: phNum });
        const validated = validation.otp === otp;
        if (validated) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
});
const userRegistrationSrvc = (userRegDetails, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userFinding = yield userSignupSchema_1.userSignupModel.findById(userId);
    try {
        if (userFinding.isVerified === true) {
            const updatedUser = yield userSignupSchema_1.userSignupModel.findByIdAndUpdate(userId, { $set: { firstname: userRegDetails.firstname, lastname: userRegDetails.lastname } });
            updatedUser.save();
            return true;
        }
        else {
            console.log('not verified');
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
});
const userLoginSrvc = (userValues, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFinding = yield userSignupSchema_1.userSignupModel.findOne({ emailOrPhone: `+91${userValues.phoneNumber}` }).select('+password');
        if (!userFinding || !(yield userFinding.comparePassword(userValues.password, userFinding.password))) {
            const error = new customeErrorHandler_1.CustomeError('Incorrect username or password', 404);
            next(error);
        }
        else {
            const logged = yield userSignupSchema_1.userSignupModel.findOneAndUpdate({ emailOrPhone: `+91${userValues.phoneNumber}` }, { $set: { isLogged: true } });
            logged.save();
            const token = (0, token_1.userToken)(userFinding);
            return token;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userService = {
    userSighnupSrvc,
    userOtpValidation: userOtpValidationSrvc,
    userRegistration: userRegistrationSrvc,
    userLoginSrvc
};
