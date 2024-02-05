import { NextFunction, Request, Response } from "express";
import { userService } from "../services/authService/authService.ts.js";
import { CustomeError } from "../utils/customeErrorHandler.js";
import { otpService } from "../services/authService/otpService.js";

const otpValidation = async (req: Request, res: Response, next?: NextFunction) => {

    const validating:boolean = await userService.userOtpValidation(req.params.id,req.body.otp);
    if (validating) {
        otpService.otpVerfying(req.params.id)
        res.status(200).json({
            status:"OK",
            message:"Otp verified"
        })
    }else {
        next(new CustomeError("Invalid OTP",400));
    }
}

export default otpValidation