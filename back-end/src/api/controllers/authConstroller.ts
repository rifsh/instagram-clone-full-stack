import { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/asyncHandler";
import { userLoginInterface, userRegInterface, userSighnup } from "../model/interfaces/userSighnupInterface";
import { otpService } from "../services/authService/otpService";
import { userService } from "../services/authService/authService.ts";
import { userToken } from "../utils/token";

export const userOtpSend = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userDetails: userSighnup = req.body;
    const userId: string = req.params.id;
    const sentOtp = await otpService.sentEmail(userId, userDetails.emailOrPhone);
    if (sentOtp) {
        // await userService.userRegSrvc(userDetails, next);
        const datas = await userService.userSighnupSrvc(userDetails, next);
        // const token = userSignupToken();
        res.json({
            status: 200,
            message: "Otp sent successfully"
        })
    } else {
        res.json({
            status: 404,
            message: "Something went wrong"
        })
    }
})
const userRegistration = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userValues: userRegInterface = req.body;
    const verfiedUser = await userService.userRegistration(userValues, req.params.id);
    if (verfiedUser) {
        const token = userToken();
        res.status(200).json({
            status: "OK",
            message: "User created successfully",
            token
        })
    } else {
        res.json({
            status: 404,
            message: "User is not verified"
        })
    }
})
const userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userValues: userLoginInterface = req.body;
    const token: string = await userService.userLoginSrvc(userValues, next);
    if (token) {
        res.status(200).json({
            status:"OK",
            message:"Successfully logged",
            token
        })
    }
})


export const UserController = {
    userOtpSend,
    userRegistration,
    userLogin
}