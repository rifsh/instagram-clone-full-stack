import { Response } from "express";
import { UserLoginInterface, UserDobInterface, UserSighnupInterface } from "../../model/interfaces/userSighnupInterface";
import { userSignupModel } from "../../model/schemas/userSchema";
import otpModel from "../../model/schemas/otpSchema";
import bcrypt from 'bcrypt';

const userSighnupSrvc = async (userDetails: UserSighnupInterface): Promise<UserSighnupInterface> => {
    console.log(userDetails.email);
    
    try {
        if (userDetails) {
            const userDetail = await userSignupModel.create({
                // phone: `+91${userDetails.phone}`,
                email:userDetails.email,
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
const userOtpValidationSrvc = async (userId?: string, otp?: string): Promise<boolean> => {
    try {
        const user = userSignupModel.findById(userId);

        const email: string = ((await user).email);

        const validation = await otpModel.findOne({ email: email });

        const validated = validation.otp === otp;
        if (!email) {
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
    const dbDob: string = `${dob.month}-${dob.day}-${dob.year}`;
    const mainDob: Date = new Date(dbDob);

    try {
        if (await userSignupModel.findById(userId)) {
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
const phoneNumberCahngeSrvc = async (userId: string, phone: string): Promise<boolean> => {
    try {
        const user = await userSignupModel.findById(userId);
        if (user) {
            await userSignupModel.findByIdAndUpdate(userId, { $set: { phone: `+91${phone}` } });
            return true;
        } else {
            return false;
        }
    } catch (error) {

    }
}
const userOtpSendingSrvc = async (userId: string) => {
    // try {
    //     const otp = await otpService.sentEmail(userId);
    //     console.log(otp);

    // } catch (error) {
    //     console.log(error.message);
    // }
}
const userLoginSrvc = async (res: Response, userValues: UserLoginInterface): Promise<boolean | string> => {
    const userByUsername = await userSignupModel.findOne({ username: userValues.userEmail });
    const userByUserPhone = await userSignupModel.findOne({ email: userValues.userEmail });
    console.log(userValues.userEmail);
    
    if (userByUserPhone || !userByUsername) {
        try {
            if (!await userByUserPhone.comparePassword(userValues.password, userByUserPhone.password) || !userByUserPhone) {
                return false
            }
            else if (userByUserPhone.isVerified === true) {
                const isLogged = await userSignupModel.findOneAndUpdate({ email: userValues.userEmail }, { $set: { isLogged: true } });
                isLogged.save();
                return isLogged.id

            } else {
                return false
            }
        } catch (error) {
            console.log(error.message);
        }
    } else if (!userByUserPhone || userByUsername) {
        try {
            if (!await userByUsername.comparePassword(userValues.password, userByUsername.password) || !userByUsername) {
                return false
            }
            else if (userByUsername.isVerified === true) {
                const isLogged = await userSignupModel.findOneAndUpdate({ username: userValues.userEmail }, { $set: { isLogged: true } });
                isLogged.save();
                return isLogged.id
            } else {
                return false
            }
        } catch (error) {
            console.log(error.message);
        }
    } else {
        return false
    }
}
const userPasswordResetingSrvc = async (userId: string, prevPassword: string, password: string) => {
    const userFinding = await userSignupModel.findById(userId);
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        if (userFinding) {
            const passwordMatching = await userFinding.comparePassword(prevPassword, userFinding.password);
            if (passwordMatching && password.length > 0) {
                await userSignupModel.findByIdAndUpdate(userId, { password: hashedPassword });
                return true
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log(error);
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
    phoneNumberCahngeSrvc,
    userOtpSendingSrvc,
    userLoginSrvc,
    userPasswordResetingSrvc,
    userDeletingSrvc,
}