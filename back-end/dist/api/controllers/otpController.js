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
Object.defineProperty(exports, "__esModule", { value: true });
const authService_ts_js_1 = require("../services/authService/authService.ts.js");
const otpService_js_1 = require("../services/authService/otpService.js");
const otpValidation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validating = yield authService_ts_js_1.userAuthService.userOtpValidationSrvc(req.params.id, req.body.otp);
    if (validating) {
        otpService_js_1.otpService.otpVerfying(req.params.id);
        res.status(200).json({
            status: "OK",
            message: "Otp verified"
        });
    }
    else {
        res.status(402).json({
            status: "OK",
            message: "Invalid OTP"
        });
    }
});
exports.default = otpValidation;
