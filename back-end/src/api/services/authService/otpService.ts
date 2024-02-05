import twilio, { Twilio } from "twilio";
import bcrypt from "bcrypt";
import validatePhoneNumber from "../../utils/phoneValidation";
import otpGenerate from "../../utils/generateOtp";
import otpModel from "../../model/schemas/otpSchema";
import { userService } from "./authService.ts";
import { ObjectId } from "mongoose";
import { userSignupModel } from "../../model/schemas/userSignupSchema";

const client: Twilio = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)


export const sentOtp = async (userId, phNumber: string): Promise<boolean> => {

    try {
        if (!validatePhoneNumber(phNumber)) {
            return false;
        } else {
            const Otp = await otpGenerate();
            const numberFinding = await otpModel.findOne({ phoneNumber: phNumber });

            if (numberFinding) {
                const updatingOtp = await otpModel.findOneAndUpdate({ phoneNumber: phNumber }, { $set: { otp: Otp } });
                // const salt = await bcrypt.genSalt(12);
                // updatingOtp.otp = await bcrypt.hash(updatingOtp.otp, salt);
                updatingOtp.save();
            } else {
                const otpData = new otpModel({ userID: userId, phoneNumber: phNumber, otp: Otp, otpExpared: new Date() });
                // const salt = await bcrypt.genSalt(12);
                // otpData.otp = await bcrypt.hash(otpData.otp, salt);
                otpData.save();
            }

            // otp send to twilio
            await client.messages.create({
                body: `${Otp} this is your otp, it will expires in 4 minutes`,
                from: '+17163033405',
                to: phNumber
            })
            return true
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
export const otpVerfying = async (phNUmber: string) => {
    const userVerifying = await userSignupModel.findOneAndUpdate({ emailOrPhone: `+91${phNUmber}` }, { $set: { isVerified: true } });
    userVerifying.save();
}

export const otpService = {
    sentEmail: sentOtp,
    otpVerfying
}