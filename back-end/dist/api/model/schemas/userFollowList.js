"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    userID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'userSignup',
    },
    followers: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'userSignup',
    },
    following: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'userSignup',
    }
});
const userFollowListModel = mongoose_1.default.model('followList', schema);
exports.default = userFollowListModel;
