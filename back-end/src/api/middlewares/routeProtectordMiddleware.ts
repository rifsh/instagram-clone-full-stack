import { NextFunction, Request, Response } from "express";
import catchAsync from "./asyncHandler";

const userRouteProtecter = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
})