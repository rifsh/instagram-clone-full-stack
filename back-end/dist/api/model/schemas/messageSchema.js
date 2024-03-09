"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: 'userSignup'
    },
    reciever: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: 'userSignup'
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });
const MessaageSchema = mongoose_1.default.model('Message', schema);
exports.default = MessaageSchema;
