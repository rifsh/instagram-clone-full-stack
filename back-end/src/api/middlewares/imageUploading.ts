import multer from "multer";
import cloudinary from 'cloudinary';
import fs from 'fs';
import { CustomeError } from "../utils/customeErrorHandler";
import { NextFunction, Request, Response } from "express";

const storage = multer.diskStorage({
    destination: '../uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 }
});

const postUpload = multer({ storage: storage });

const cloudin = cloudinary.v2;
cloudin.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export const userProfileimgUpload = async (req: Request, res: Response, next: NextFunction) => {
    upload.single("profilePic")(req, res, async (err) => {
        // const file = req.file;
        // console.log(req.file);
        if (err) {
            next(new CustomeError(err.message, 401));
        }
        try {
            const result = await cloudin.uploader.upload(req.file.path, {
                folder: "userpofile",
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            });
            req.body.image = result.secure_url;
            fs.unlink(req.file.path, (unlinker) => {
                if (unlinker) {
                    console.log('Error, deleting local file', unlinker);
                }
            })
            next()
        } catch (error) {
            next(new CustomeError('Error uploading image file to Cloudinary', 404));
        }
    })
}

export const userAddPostimgUpload = async (req: Request, res: Response, next: NextFunction) => {
    postUpload.single("img")(req, res, async (err) => {
        // const file = req.file;
        // console.log(req.file);
        if (err) {
            next(new CustomeError(err.message, 400));
        }
        try {
            const result = await cloudin.uploader.upload(req.file.path, {
                folder: "Posts",
                transformations: [
                    { width: 800, height: 600, crop: 'fit' } // Example resize to 800x600 with fit crop
                ]
            })
            req.body.image = result.secure_url;
            fs.unlink(req.file.path, (unlinker) => {
                if (unlinker) {
                    console.log('Error, deleting local file', unlinker);
                }
            })
            next()
        } catch (error) {
            next(new CustomeError('Error uploading products file to Cloudinary', 404));
        }
    })
} 