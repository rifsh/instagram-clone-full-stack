import { ObjectId } from "mongoose";

export interface OtpInterface {
    userID:ObjectId;
    phoneNumber: string;
    otp:string;
    otpExpared: Date;
}