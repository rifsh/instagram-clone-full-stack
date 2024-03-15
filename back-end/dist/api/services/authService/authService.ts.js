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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSighnupSrvc = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userDetails.email);
    try {
        if (userDetails) {
            const userDetail = yield userSchema_1.userSignupModel.create({
                // phone: `+91${userDetails.phone}`,
                email: userDetails.email,
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
        const email = ((yield user).email);
        const validation = yield otpSchema_1.default.findOne({ email: email });
        const validated = validation.otp === otp;
        if (!email) {
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
    const userByUsername = yield userSchema_1.userSignupModel.findOne({ username: userValues.userEmail });
    const userByUserPhone = yield userSchema_1.userSignupModel.findOne({ email: userValues.userEmail });
    console.log(userValues.userEmail);
    if (userByUserPhone || !userByUsername) {
        try {
            if (!(yield userByUserPhone.comparePassword(userValues.password, userByUserPhone.password)) || !userByUserPhone) {
                return false;
            }
            else if (userByUserPhone.isVerified === true) {
                const isLogged = yield userSchema_1.userSignupModel.findOneAndUpdate({ email: userValues.userEmail }, { $set: { isLogged: true } });
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
                const isLogged = yield userSchema_1.userSignupModel.findOneAndUpdate({ username: userValues.userEmail }, { $set: { isLogged: true } });
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
const userPasswordResetingSrvc = (userId, prevPassword, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userFinding = yield userSchema_1.userSignupModel.findById(userId);
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    try {
        if (userFinding) {
            const passwordMatching = yield userFinding.comparePassword(prevPassword, userFinding.password);
            if (passwordMatching && password.length > 0) {
                yield userSchema_1.userSignupModel.findByIdAndUpdate(userId, { password: hashedPassword });
                return true;
            }
            else {
                return false;
            }
        }
    }
    catch (error) {
        console.log(error);
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
    userPasswordResetingSrvc,
    userDeletingSrvc,
};
