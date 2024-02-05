import exp from 'express'
import { UserController } from '../controllers/authConstroller';
import otpValidation from '../controllers/otpController';

export const userRouter = exp.Router();

userRouter.post('/otpGeneration', UserController.userOtpSend)
//auth
.post('/reg/:id',UserController.userRegistration)
.post('/otpvalidation/:id',otpValidation)
.post('/login',UserController.userLogin)