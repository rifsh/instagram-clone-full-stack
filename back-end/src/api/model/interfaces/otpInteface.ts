import { ObjectId } from "mongoose";

export interface OtpInterface {
    userID:ObjectId;
    phoneNumber: string;
    email:string;
    otp:string;
    otpExpared: Date;
}