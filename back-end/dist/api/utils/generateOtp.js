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
exports.otpGenerate = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const otpGenerate = () => __awaiter(void 0, void 0, void 0, function* () {
    const otp = yield otp_generator_1.default.generate(4, {
        lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
    });
    return otp;
});
exports.otpGenerate = otpGenerate;
exports.default = exports.otpGenerate;
