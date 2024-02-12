"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    firstName: {
        type: String
    },
    lastName: {
        types: String
    },
    additionalName: {
        type: String
    },
    pronouns: {
        types: String
    },
    currentPosition: [{
            position: {
                types: String
            },
            industry: {
                types: String
            },
        }],
    Education: [{
            education: {
                type: String
            },
        }],
    country: {
        types: String
    },
    city: {
        types: String
    }
});
exports.userProfileModel = mongoose_1.default.model('userProfile', schema);
