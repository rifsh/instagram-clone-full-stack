import twilio, { Twilio } from "twilio";
import validatePhoneNumber from "../../utils/phoneValidation";
import otpGenerate from "../../utils/generateOtp";
import otpModel from "../../model/schemas/otpSchema";
import { userSignupModel } from "../../model/schemas/userSchema";
import { otpEmailSend } from "../../utils/emailSending";

const client: Twilio = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)


export const sentOtp = async (userId: string) => {

    try {
        const user = await userSignupModel.findById(userId);
        const Otp = await otpGenerate();
        await otpEmailSend(user.email,Otp)
        const emailFinding = await otpModel.findOne({ email: user.email });

        if (emailFinding) {
            const updatingOtp = await otpModel.findOneAndUpdate({ email: user.email }, { $set: { otp: Otp } });
            updatingOtp.save();
            const userVerified = await userSignupModel.findOneAndUpdate({ email: user.email }, { $set: { isVerified: false } });
            userVerified.save();
        } else {
            const otpData = new otpModel({ userID: userId, email:user.email, otp: Otp, otpExpared: new Date() });
            otpData.save();
        }

    } catch (error) {
        console.log(error);
    }
}
export const otpVerfying = async (userId: string) => {

    const userVerifying = await userSignupModel.findByIdAndUpdate(userId, { $set: { isVerified: true } });
    userVerifying.save();
    if (!userVerifying) {
        return false
    } else {
        return true
    }

}

export const otpService = {
    sentOtp,
    otpVerfying
}