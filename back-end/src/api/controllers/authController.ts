import { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/asyncHandler";
import { UserDobInterface, UserSighnupInterface } from "../model/interfaces/userSighnupInterface";
import { otpService } from "../services/authService/otpService";
import { userAuthService } from "../services/authService/authService.ts";
import { CustomeError } from "../utils/customeErrorHandler";
import { userToken } from "../utils/token";

export const userOtpSend = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
        const sentOtp = await otpService.sentEmail(req.params.id, req.params.phone);
        res.status(200).json({
            status: "Success",
            datas
        })
    } else {
        next(new CustomeError('User is not found', 404));
    }
})
const userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const datas= await userAuthService.userLoginSrvc(res, req.body);
    console.log(datas);
    
    if (datas) {
        res.status(200).json({
            message:"Success",
            token: datas
        })
    }else {
        res.status(404).json({
            message:'Username or password is incorrect'
        })
    }
    
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
    userLogin,
    userDelting
}