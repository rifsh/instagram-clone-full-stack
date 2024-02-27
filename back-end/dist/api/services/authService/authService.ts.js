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
const userOtpValidationSrvc = (userId, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = userSchema_1.userSignupModel.findById(userId);
        const phNum = (yield user).phone;
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
    const dbDob = `${dob.month}-${dob.day}-${dob.year}`;
    const mainDob = new Date(dbDob);
    try {
        if (yield userSchema_1.userSignupModel.findById(userId)) {
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
const phoneNumberCahngeSrvc = (userId, phone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.userSignupModel.findById(userId);
        if (user) {
            yield userSchema_1.userSignupModel.findByIdAndUpdate(userId, { $set: { phone: `+91${phone}` } });
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
    }
});
const userOtpSendingSrvc = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const otp = await otpService.sentEmail(userId);
    //     console.log(otp);
    // } catch (error) {
    //     console.log(error.message);
    // }
});
const userLoginSrvc = (res, userValues) => __awaiter(void 0, void 0, void 0, function* () {
    const userByUsername = yield userSchema_1.userSignupModel.findOne({ username: userValues.phoneorusername });
    const userByUserPhone = yield userSchema_1.userSignupModel.findOne({ phone: `+91${userValues.phoneorusername}` });
    if (userByUserPhone || !userByUsername) {
        try {
            if (!(yield userByUserPhone.comparePassword(userValues.password, userByUserPhone.password)) || !userByUserPhone) {
                return false;
            }
            else if (userByUserPhone.isVerified === true) {
                const isLogged = yield userSchema_1.userSignupModel.findOneAndUpdate({ phone: `+91${userValues.phoneorusername}` }, { $set: { isLogged: true } });
                isLogged.save();
                return isLogged.id;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    else if (!userByUserPhone || userByUsername) {
        try {
            if (!(yield userByUsername.comparePassword(userValues.password, userByUsername.password)) || !userByUsername) {
                return false;
            }
            else if (userByUsername.isVerified === true) {
                const isLogged = yield userSchema_1.userSignupModel.findOneAndUpdate({ username: userValues.phoneorusername }, { $set: { isLogged: true } });
                isLogged.save();
                return isLogged.id;
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
    phoneNumberCahngeSrvc,
    userOtpSendingSrvc,
    userLoginSrvc,
    userDeletingSrvc,
};
