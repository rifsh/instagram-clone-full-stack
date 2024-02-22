import { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/asyncHandler";
import { userService } from "../services/userService/userService";
import { UserProfileInterface } from "../model/interfaces/userInterfaces";
import { CustomeError } from "../utils/customeErrorHandler";


export const userProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userProfileDetails: UserProfileInterface = req.body;
    const datas = await userService.userProfileSrvc(req.body, req.params.id, next);

    if (datas) {
        res.status(200).json({
            message: 'Success',
            datas
        })
    } else {
        next(new CustomeError('Something went wrong', 404));
    }
})
export const userById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.userByIdSrvc(req.params.id, next);
    res.status(200).json({
        status: 'success',
        message: 'Successfully fetched user data.',
        datas: user
    })
})


export const userController = {
    userProfile,
    userById
}   