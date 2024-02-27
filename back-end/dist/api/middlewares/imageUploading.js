"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAddPostimgUpload = exports.userProfileimgUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_1 = __importDefault(require("fs"));
const customeErrorHandler_1 = require("../utils/customeErrorHandler");
const storage = multer_1.default.diskStorage({
    destination: '../uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1024 * 1024 }
});
const cloudin = cloudinary_1.default.v2;
cloudin.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const userProfileimgUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    upload.single("profilePic")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        // const file = req.file;
        // console.log(req.file);
        if (err) {
            next(new customeErrorHandler_1.CustomeError(err.message, 401));
        }
        try {
            const result = yield cloudin.uploader.upload(req.file.path, {
                folder: "userpofile",
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            });
            req.body.image = result.secure_url;
            fs_1.default.unlink(req.file.path, (unlinker) => {
                if (unlinker) {
                    console.log('Error, deleting local file', unlinker);
                }
            });
            next();
        }
        catch (error) {
            next(new customeErrorHandler_1.CustomeError('Error uploading image file to Cloudinary', 404));
        }
    }));
});
exports.userProfileimgUpload = userProfileimgUpload;
const userAddPostimgUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    upload.single("img")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        // const file = req.file;
        // console.log(req.file);
        if (err) {
            next(new customeErrorHandler_1.CustomeError(err.message, 400));
        }
        try {
            const result = yield cloudin.uploader.upload(req.file.path, {
                folder: "Posts"
            });
            req.body.image = result.secure_url;
            fs_1.default.unlink(req.file.path, (unlinker) => {
                if (unlinker) {
                    console.log('Error, deleting local file', unlinker);
                }
            });
            next();
        }
        catch (error) {
            next(new customeErrorHandler_1.CustomeError('Error uploading products file to Cloudinary', 404));
        }
    }));
});
exports.userAddPostimgUpload = userAddPostimgUpload;
