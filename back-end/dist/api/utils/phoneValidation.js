"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const validatePhoneNumber = (phNumber) => {
    const client = (0, twilio_1.default)(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
    try {
        client.lookups.v1.phoneNumbers(phNumber).fetch();
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.default = validatePhoneNumber;
