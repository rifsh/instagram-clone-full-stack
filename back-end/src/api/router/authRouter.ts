import exp from 'express'
import { UserAuthController } from '../controllers/authController';
import otpValidation from '../controllers/otpController';

export const userAuthRouter = exp.Router();

//auth
userAuthRouter.post('/user-signup', UserAuthController.userOtpSend)
.post('/userdob/:id',UserAuthController.userDob)
.post('/otpvalidation/:id',otpValidation)
.post('/change-phone-number/:id',UserAuthController.userPhoneNumberChange)
.post('/otp-send/:id',UserAuthController.otpSending)
.post('/login',UserAuthController.userLogin)
.delete('/userDeleting/:id',UserAuthController.userDelting)
// .post