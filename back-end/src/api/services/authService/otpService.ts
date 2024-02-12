import twilio, { Twilio } from "twilio";
import nodemailer from 'nodemailer'
import bcrypt from "bcrypt";
import validatePhoneNumber from "../../utils/phoneValidation";
import otpGenerate from "../../utils/generateOtp";
import otpModel from "../../model/schemas/otpSchema";
import { userAuthService } from "./authService.ts";
import { ObjectId } from "mongoose";
import { userSignupModel } from "../../model/schemas/userSchema";
import { UserSighnupInterface } from "../../model/interfaces/userSighnupInterface";

const client: Twilio = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)


export const sentOtp = async (userId:string, phNumber: string) => {
    try {
        if (!validatePhoneNumber(phNumber)) {
            return false;
        } else {
            const Otp = await otpGenerate();
            const numberFinding = await otpModel.findOne({ phoneNumber: `+91${phNumber}` });
            
            if (numberFinding) {
                const updatingOtp = await otpModel.findOneAndUpdate({ phoneNumber: `+91${phNumber}` }, { $set: { otp: Otp } });
                updatingOtp.save();
                // return updatingOtp
            } else {
                const otpData = new otpModel({ userID: userId, phoneNumber: `+91${phNumber}`, otp: Otp, otpExpared: new Date() });
                otpData.save();
            }

            // otp send to twilio
            await client.messages.create({
                body: `${Otp} this is your otp, it will expires in 4 minutes`,
                from: '+17163033405',
                to: `+91${phNumber}`
            })
            return true
        }
    } catch (error) {
        console.log(error);
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
export const otpVerfying = async (phNUmber: string) => {
    
    const userVerifying = await userSignupModel.findOneAndUpdate({ phone: `+91${phNUmber}` }, { $set: { isVerified: true } });
    userVerifying.save();
    if (!userVerifying) {
        return false
    }else {
        return true
    }
    
}

export const otpService = {
    sentEmail: sentOtp,
    otpVerfying
}