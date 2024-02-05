import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import { userSignupModel } from "./userSignupSchema";
import { otpInterface } from "../interfaces/otpInteface";

const otpSchema = new mongoose.Schema<otpInterface>({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: userSignupModel
    },
    phoneNumber: String,
    otp: String,
    otpExpared: Date
})

otpSchema.index({ expiresAt: 1 });
// otpSchema.pre('save', async function (next: NextFunction) {
//     this.otp = await bcrypt.hash(this.otp, 12);
//     next();
// })


const otpModel = mongoose.model('otp', otpSchema);

mongoose.connection.on('connected', async () => {
    setInterval(async () => {
        try {
            otpModel.deleteMany({ expiresAt: { $lt: new Date() } });
            console.log('Expired otp deleted successfully');
        } catch (error) {
            console.log('Error deleting expired otp', error);
        }
    }, 140000) //4minuted
})

export default otpModel