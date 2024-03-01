import { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/asyncHandler";
import { userPostService } from "../services/userService/userPostService";


export const userAddPost = catchAsync(async (req: Request, res: Response,) => {
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
export const getPost = catchAsync(async (req: Request, res: Response,) => {
    const datas = await userPostService.getPostSrvc();
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
export const getPostById = catchAsync(async (req: Request, res: Response,) => {
    const datas = await userPostService.getPostByidSrvc(req.params.id);
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
export const likePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params.id;    
    const like: boolean = await userPostService.postLikeSrvc(postId, req.body.userId);
    if (like) {
        res.status(200).json({
            message: "Liked"
        })
    } else {
        res.status(200).json({
            message: "Like removed"
        })
    }
})
export const postComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
})
export const deletePost = catchAsync(async (req: Request, res: Response,) => {
    const postDeleting = await userPostService.deletePostSSrvc(req.params.id);
    if (postDeleting) {
        res.status(200).json({
            message: "Successfully removed",
        })
    } else {
        res.status(404).json({
            message: "Error deleting a post"
        })
    }
})

export const userPostController = {
    userAddPost,
    getPost,
    getPostById,
    likePost,
    postComment,
    deletePost
}