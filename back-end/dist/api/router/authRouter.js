"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const otpController_1 = __importDefault(require("../controllers/otpController"));
exports.userAuthRouter = express_1.default.Router();
//auth
exports.userAuthRouter.post('/user-signup', authController_1.UserAuthController.userOtpSend)
    .post('/userdob/:id/:phone', authController_1.UserAuthController.userDob)
    .post('/otpvalidation/:id', otpController_1.default)
    .post('/login', authController_1.UserAuthController.userLogin)
    .delete('/userDeleting/:id', authController_1.UserAuthController.userDelting);
// .post
