"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const conversationSchema = new mongoose_1.default.Schema({
    participants: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'userSignup'
        }
    ],
    messages: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
});
const conversation = mongoose_1.default.model("Conversation", conversationSchema);
exports.default = conversation;
