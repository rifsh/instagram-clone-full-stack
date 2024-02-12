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
exports.userAuthService = void 0;
const userSchema_1 = require("../../model/schemas/userSchema");
const otpSchema_1 = __importDefault(require("../../model/schemas/otpSchema"));
const token_1 = require("../../utils/token");
const userSighnupSrvc = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (userDetails) {
            const userDetail = yield userSchema_1.userSignupModel.create({
                phone: `+91${userDetails.phone}`,
                fullname: userDetails.fullname,
                username: userDetails.username,
                password: userDetails.password
            });
            return userDetail;
        }
    }
    catch (err) {
        console.log(err);
    }
});
const userOtpValidationSrvc = (phNUmber, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phNum = `+91${phNUmber}`;
        const validation = yield otpSchema_1.default.findOne({ phoneNumber: phNum });
        const validated = validation.otp === otp;
        if (!phNum) {
            return false;
        }
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
const userDobSrvc = (dob, userId, phone) => __awaiter(void 0, void 0, void 0, function* () {
    const dbDob = `${dob.month}-${dob.day + 1}-${dob.year}`;
    const mainDob = new Date(dbDob);
    try {
        if (yield userSchema_1.userSignupModel.findOne({ _id: userId, phone: `+91${phone}` })) {
            const dobUpdate = yield userSchema_1.userSignupModel.findByIdAndUpdate(userId, { $set: { dateOfBirth: mainDob } });
            dobUpdate.save();
            return dobUpdate;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
const userLoginSrvc = (res, userValues) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.userSignupModel.findOne({ username: userValues.username, phone: `+91${userValues.phone}` });
    if (user) {
        try {
            if (!(yield user.comparePassword(userValues.password, user.password)) || !user) {
                return false;
            }
            else if (user.isVerified === true) {
                const isLogged = yield userSchema_1.userSignupModel.findOneAndUpdate({ username: userValues.username }, { $set: { isLogged: true } });
                isLogged.save();
                const token = (0, token_1.userToken)(user.id);
                return token;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    else {
        return false;
    }
});
const userDeletingSrvc = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDeleting = yield userSchema_1.userSignupModel.findByIdAndDelete(userId);
        if (userDeleting) {
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
exports.userAuthService = {
    userSighnupSrvc,
    userOtpValidationSrvc,
    userDobSrvc,
    userLoginSrvc,
    userDeletingSrvc,
};
