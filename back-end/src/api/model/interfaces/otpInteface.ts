import { ObjectId } from "mongoose";

export interface otpInterface {
    userID:ObjectId;
    phoneNumber: string;
    otp:string;
    otpExpared: Date;
}