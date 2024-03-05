import { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/asyncHandler";
import { userService } from "../services/userService/userService";
import { UserProfileInterface } from "../model/interfaces/userInterfaces";
import { CustomeError } from "../utils/customeErrorHandler";


export const allUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.allUsers();
    if (users) {
        res.status(200).json({
            status: "OK",
            datas: users
        })
    }
})
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
        message: 'Successfully fetched user data.',
        datas: user
    })
})
export const profileImgChange = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const datas = await userService.userProfileImgChangeSrvc(req.params.id, req.body.image);
    if (datas) {
        res.status(200).json({
            Message: "Successfully updated"
        })
    } else {
        next(new CustomeError('Something went wrong', 404));
    }
})
export const userFollowing = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const followingUserId: string = req.params.id;
    const followerUserId: string = req.body.followerId;
    const userFollow = await userService.userFollowingSrvc(followingUserId, followerUserId);
    if (userFollow) {
        res.status(200).json({
            message: "Following"
        })
    } else {
        res.status(200).json({
            message: "unFollowed"
        })
    }
})
export const profileImgRemove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.userProfileImgRemovesrvc(req.params.id);
    if (result) {
        res.status(200).json({
            Message: "Successfully Removed"
        })
    } else {
        next(new CustomeError('Something went wrong', 404));
    }
})


export const userController = {
    allUser,
    userProfile,
    profileImgChange,
    profileImgRemove,
    userFollowing,
    userById
}   