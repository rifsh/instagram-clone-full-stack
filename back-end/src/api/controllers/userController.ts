import { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/asyncHandler";
import { userService } from "../services/userService/userService";
import { UserProfileInterface } from "../model/interfaces/userInterfaces";
import { CustomeError } from "../utils/customeErrorHandler";
import { ObjectId } from "mongoose";


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
    const followingUserId: any = req.params.id;
    const followerUserId: any = req.body.followerId;
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
    // const followingUserId: any = req.params.id;
    // const followerUserId: any = req.body.followerId;
    // const userFollow = await userService.userFollowingSrvc(followingUserId, followerUserId);
    // if (userFollow) {
    //     res.status(200).json({
    //         message: "Following"
    //     })
    // } else {
    //     next(new CustomeError('Something sent wrong', 404));    
    // }
})
export const userUnfollow = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const followingUserId: any = req.params.id;
    // const followerUserId: any = req.body.followerId;
    // const userUnfollowing = await userService.userUnfollow(followingUserId, followerUserId);
    // if (userUnfollowing) {
    //     res.status(200).json({
    //         message: "Unfollowed"
    //     })
    // }
})
export const userFollowersList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    const datas = await userService.userFollowersList(userId, next);
    res.status(200).json({
        message: "OK",
        datas
    })
})
export const userFollowingList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    const datas = await userService.userFollowingList(userId, next);
    res.status(200).json({
        message: "OK",
        datas
    })
})
export const userFollowerRemove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: any = req.params.id;
    const removingId: ObjectId = req.body.followerId;
    const values = await userService.userFollowerRemoveSrvc(userId, removingId);
    if (values) {
        res.status(200).json({
            message: "Removed"
        })
    } else {
        res.status(404).json({
            message: "Something went wrong"
        })
    }
})
export const userFollowingRemove = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: any = req.params.id;
    const removingId: ObjectId = req.body.followingUser;
    const values = await userService.userFollowingRemoveSrvc(userId, removingId);
    if (values) {
        res.status(200).json({
            message: "Removed"
        })
    } else {
        res.status(404).json({
            message: "Something went wrong"
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
export const userMessages = catchAsync(async (req: Request, res: Response, next: NextFunction) => { 
    const userChatId:string=req.params.id;
    const senderId:string=req.user._id;
    const datas = await userService.userMessageSrvc(userChatId,senderId);
    console.log(senderId);
    
    if (datas) {
        res.status(200).json({
            status:'success',
            message:datas.messages
        })
    }else {
        res.status(200).json({
            status:'no messages',
            // message:datas.messages
        })
    }
})


export const userController = {
    allUser,
    userProfile,
    profileImgChange,
    profileImgRemove,
    userFollowing,
    userUnfollow,
    userFollowersList,
    userFollowingList,
    userFollowerRemove,
    userFollowingRemove,
    userMessages,
    userById
}   