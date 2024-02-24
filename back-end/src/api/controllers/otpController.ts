import { NextFunction, Request, Response } from "express";
import { userAuthService } from "../services/authService/authService.ts.js";
import { otpService } from "../services/authService/otpService.js";

const otpValidation = async (req: Request, res: Response) => {

    const validating = await userAuthService.userOtpValidationSrvc(req.params.id,req.body.otp);
    
    if (validating) {
        otpService.otpVerfying(req.params.id)
        res.status(200).json({
            status:"OK",
            message:"Otp verified"
        })
    }else {
        res.status(404).json({
            status:"OK",
            message:"Invalid OTP"
        })
    }
}

export default otpValidation