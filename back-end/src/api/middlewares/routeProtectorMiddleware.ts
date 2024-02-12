import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import catchAsync from "./asyncHandler";
import { CustomeError } from "../utils/customeErrorHandler";
import { userSignupModel } from '../model/schemas/userSchema';


export const userRouteProtector = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    const responseToken: string = req.headers.authorization;
    if (responseToken && responseToken.startsWith('bearer')) {
        const sampleToken: string[] = responseToken.split(' ');
        token = sampleToken[1];
    }
    
    if (!token) {
        next(new CustomeError('You are not logged in !!', 402));
    }

    const tekenDecode = await jwt.verify(token, process.env.jwt_string);
    const tokenDec =  tekenDecode as JwtPayload;

    let user = await userSignupModel.findById(tokenDec.id);

    if (!user) {
        next(new CustomeError('User is not present', 401));
    }

    next()



})