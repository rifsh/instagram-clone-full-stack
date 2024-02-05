import { NextFunction } from "express";
import { userLoginInterface, userRegInterface, userSighnup } from "../../model/interfaces/userSighnupInterface";
import { userSignupModel } from "../../model/schemas/userSignupSchema";
import { CustomeError } from "../../utils/customeErrorHandler";
import otpModel from "../../model/schemas/otpSchema";
import { userToken } from "../../utils/token";
// import { userRegistrationModel } from "../../model/schemas/userRegistrationSchema";

const userSighnupSrvc = async (userDetails: userSighnup, next: NextFunction) => {
    try {
        if (userDetails) {
            const userDetail = await userSignupModel.create({ password: userDetails.password, emailOrPhone: userDetails.emailOrPhone });
            return userDetail
        }
    } catch (err) {
        next(new CustomeError('User details required', 303));
    }
}
const userOtpValidationSrvc = async (phNUmber?: string, otp?: string): Promise<boolean> => {
    try {
        const phNum: string = `+91${phNUmber}`;
        const validation = await otpModel.findOne({ phoneNumber: phNum });
        const validated = validation.otp === otp;

        if (validated) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
    }
}
const userRegistrationSrvc = async (userRegDetails: userRegInterface, userId: string) => {
    const userFinding = await userSignupModel.findById(userId);
    try {
        if (userFinding.isVerified === true) {
            const updatedUser = await userSignupModel.findByIdAndUpdate(userId, { $set: { firstname: userRegDetails.firstname, lastname: userRegDetails.lastname } });
            updatedUser.save();
            return true
        } else {
            console.log('not verified');
            return false
        }
    } catch (error) {
        console.log(error);
    }
}
const userLoginSrvc = async (userValues: userLoginInterface, next): Promise<string> => {
    try {
        const userFinding = await userSignupModel.findOne({ emailOrPhone: `+91${userValues.phoneNumber}` }).select('+password');
        if (!userFinding || !await userFinding.comparePassword(userValues.password, userFinding.password)) {
            const error = new CustomeError('Incorrect username or password', 404);
            next(error)
        } else {
            const logged = await userSignupModel.findOneAndUpdate({ emailOrPhone: `+91${userValues.phoneNumber}` }, { $set: { isLogged: true } });
            logged.save();

            const token = userToken(userFinding)
            return token
        }
    } catch (error) {
        console.log(error);
    }

}

export const userService = {
    userSighnupSrvc,
    userOtpValidation: userOtpValidationSrvc,
    userRegistration: userRegistrationSrvc,
    userLoginSrvc
}