import { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/asyncHandler";
import { UserDobInterface, UserSighnupInterface } from "../model/interfaces/userSighnupInterface";
import { otpService } from "../services/authService/otpService";
import {otpEmailSend, sentMail} from '../utils/emailSending'
import { userAuthService } from "../services/authService/authService.ts";
import { CustomeError } from "../utils/customeErrorHandler";
import { userToken } from "../utils/token";

export const userOtpSend = catchAsync(async (req: Request, res: Response) => {
    const userDetails: UserSighnupInterface = req.body;
    const datas = await userAuthService.userSighnupSrvc(userDetails);
    if (!datas) {
        res.json({
            status: 404,
            message: "Something went wrong"
        })
    } else {
        res.json({
            status: 200,
            message: "User created successfully",
            datas
        })
    }
})
const userDob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userDob: UserDobInterface = req.body;
    const datas: boolean | UserSighnupInterface = await userAuthService.userDobSrvc(userDob, req.params.id, req.params.phone);
    if (datas) {
        const sentOtp = await otpService.sentOtp(req.params.id);
        res.status(200).json({
            status: "OK",
            message: "OTP send successfully",
            datas
        })
    } else {
        next(new CustomeError('User is not found', 404));
    }
})
const userPhoneNumberChange = catchAsync(async (req: Request, res: Response) => {
    const changedValue = await userAuthService.phoneNumberCahngeSrvc(req.params.id, req.body.phone);
    if (changedValue) {
        res.status(200).json({
            status: "OK",
            message: "Number changed successfully"
        })
    } else {
        res.status(404).json({
            status: "Invalid",
            message: "Something went wrong"
        })
    }
})
const otpSending = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const otp = await userAuthService.userOtpSendingSrvc(req.params.id);
    // if (otp) {
    //     res.status(200).json({
    //         status: "OK",
    //         message: "OTP send successfully",
    //     })
    // } else {
    //     next(new CustomeError('User is not found', 404));
    // }

})
const userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const datas = await userAuthService.userLoginSrvc(res, req.body);

    if (datas) {
        const token = userToken(datas);
        res.status(200).json({
            message: "Success",
            datas,
            token
        })
    } else {
        res.status(404).json({
            message: 'Username or password is incorrect'
        })
    }

})
const userPaaswordReseting = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    const prevPassword: string = req.body.prevPassword;
    const newPassword: string = req.body.password;
    
    const cahnged = await userAuthService.userPasswordResetingSrvc(userId, prevPassword, newPassword);
    if (cahnged) {
        res.status(200).json({
            message: "Password changed"
        })
    } else {
        res.status(200).json({
            message: "Entered password is not match"
        })
    }
})
const userForgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    sentMail(req.body.email)
}) 
const userDelting = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id
    const userDeleting = userAuthService.userDeletingSrvc(userId);

    if (userDeleting) {
        res.status(200).json({
            status: "OK"
        })
    } else {
        next(new CustomeError('Something went wrong', 404))
    }
})



export const UserAuthController = {
    userOtpSend,
    userDob,
    userPhoneNumberChange,
    otpSending,
    userLogin,
    userPaaswordReseting,
    userForgotPassword,
    userDelting
}