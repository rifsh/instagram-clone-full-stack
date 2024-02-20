import twilio, { Twilio } from "twilio";
import validatePhoneNumber from "../../utils/phoneValidation";
import otpGenerate from "../../utils/generateOtp";
import otpModel from "../../model/schemas/otpSchema";
import { userSignupModel } from "../../model/schemas/userSchema";

const client: Twilio = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)


export const sentOtp = async (userId: string) => {
    try {
        const user = await userSignupModel.findById(userId);

        const phNumber: string = user.phone.slice(3, 13);

        if (!validatePhoneNumber(phNumber)) {
            return false;
        } else {
            const Otp = await otpGenerate();
            const numberFinding = await otpModel.findOne({ phoneNumber: `+91${phNumber}` });

            if (numberFinding) {
                const updatingOtp = await otpModel.findOneAndUpdate({ phoneNumber: `+91${phNumber}` }, { $set: { otp: Otp } });
                updatingOtp.save();
                const userVerified = await userSignupModel.findOneAndUpdate({ phone: `+91${phNumber}`},{$set:{isVerified: false}});
                userVerified.save();
                // return updatingOtp
            } else {
                const otpData = new otpModel({ userID: userId, phoneNumber: `+91${phNumber}`, otp: Otp, otpExpared: new Date() });
                otpData.save();
            }

            // otp send to twilio
            await client.messages.create({
                body: `${Otp} this is your otp, it will expires in 4 minutes`,
                from: '+19136018157',
                to: `+91${phNumber}`
            })
            return true
        }
    } catch (error) {
        console.log(error.message);
        return false
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