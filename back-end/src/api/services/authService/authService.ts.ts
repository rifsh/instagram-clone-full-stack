import { Response } from "express";
import { UserLoginInterface, UserDobInterface, UserSighnupInterface } from "../../model/interfaces/userSighnupInterface";
import { userSignupModel } from "../../model/schemas/userSchema";
import otpModel from "../../model/schemas/otpSchema";
import { userToken } from "../../utils/token";

const userSighnupSrvc = async (userDetails: UserSighnupInterface): Promise<UserSighnupInterface> => {

    try {
        if (userDetails) {
            const userDetail = await userSignupModel.create({
                phone: `+91${userDetails.phone}`,
                fullname: userDetails.fullname,
                username: userDetails.username,
                password: userDetails.password
            });
            return userDetail
        }
    } catch (err) {
        console.log(err);

    }
}
const userOtpValidationSrvc = async (phNUmber?: string, otp?: string): Promise<boolean> => {
    try {
        const phNum: string = `+91${phNUmber}`;
        const validation = await otpModel.findOne({ phoneNumber: phNum });

        const validated = validation.otp === otp;
        if (!phNum) {
            return false
        }

        if (validated) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
    }
}
const userDobSrvc = async (dob: UserDobInterface, userId: string, phone: string): Promise<boolean | UserSighnupInterface> => {
    const dbDob: string = `${dob.month}-${dob.day + 1}-${dob.year}`;
    const mainDob: Date = new Date(dbDob);

    try {
        if (await userSignupModel.findOne({ _id: userId, phone: `+91${phone}` })) {
            const dobUpdate = await userSignupModel.findByIdAndUpdate(userId, { $set: { dateOfBirth: mainDob } });
            dobUpdate.save();
            return dobUpdate
        } else {
            return false
        }
    } catch (error) {
        console.log(error.message);

    }


}
const userLoginSrvc = async (res: Response, userValues: UserLoginInterface): Promise<boolean | string> => {
    const user = await userSignupModel.findOne({ username: userValues.username, phone: `+91${userValues.phone}` });

    if (user) {
        try {

            if (!await user.comparePassword(userValues.password, user.password) || !user) {
                return false
            }
            else if (user.isVerified === true) {
                const isLogged = await userSignupModel.findOneAndUpdate({ username: userValues.username }, { $set: { isLogged: true } });
                isLogged.save();
                const token = userToken(user.id);
                return token
            } else {
                return false
            }
        } catch (error) {
            console.log(error.message);
        }
    }else {
        return false
    }
}
const userDeletingSrvc = async (userId: string): Promise<boolean> => {
    try {
        const userDeleting = await userSignupModel.findByIdAndDelete(userId);
        if (userDeleting) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error);

    }
}

export const userAuthService = {
    userSighnupSrvc,
    userOtpValidationSrvc,
    userDobSrvc,
    userLoginSrvc,
    userDeletingSrvc,
}