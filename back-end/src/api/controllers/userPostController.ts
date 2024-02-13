import { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/asyncHandler";
import { userPostService } from "../services/userService/userPostService";


export const userAddPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const datas = await userPostService.userAddPostSrvc(req.params.id, req.body);
    if (datas) {
        res.status(200).json({
            message: "Success",
            datas
        })
    } else {
        res.status(404).json({
            message: "Something went wrong"
        })
    }
})
export const getPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const datas = await userPostService.getPostSrvc();
    if (datas) {
        res.status(200).json({
            message: "Success",
            datas
        })
    } else {
        res.status(404).json({
            message:"Something went wrong"
        })
    }
})
export const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    userPostService.getPostByid(req.params.id);
})

export const userPostController = {
    userAddPost,
    getPost,
    getPostById
}