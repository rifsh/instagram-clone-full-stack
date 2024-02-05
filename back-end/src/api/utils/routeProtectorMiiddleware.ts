import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../middlewares/asyncHandler';
import { CustomeError } from './customeErrorHandler';
import { userSignupModel } from '../model/schemas/userSignupSchema';

export const RouteProtecter = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //Reading the token and check if it exist
    let token: string;
    const testToken = req.headers.authorization;
    if (testToken && testToken.startsWith('bearer')) {
        const sampleToken: string[] = testToken.split(' ');
        token = sampleToken[1];
    } 
    

    if (!token) {
        next(new CustomeError('You are not logged in !!', 402));
    }

    //Validate the token
    const tokenDecode = await jwt.verify(token, process.env.jwt_string);
    const tokenDec = tokenDecode as JwtPayload
    //If the user exist
    let user = await userSignupModel.findById(tokenDec.id);
    
    if (!user) {
        next(new CustomeError('User is not present', 401));
    }

    next();
})