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
exports.userSignupModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema = new mongoose_1.default.Schema({
    phone: {
        type: String,
        required: [true, 'Emial or phone number is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    fullname: {
        type: String,
        required: [true, 'Your name is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    profilePic: {
        type: String,
        default: "https://imgs.search.brave.com/NLpgWA-anJ89n8ggNMg1F78gPFBzCLCKFaGd-SBIVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzA5LzU5Lzc1/LzM2MF9GXzUwOTU5/NzUzMl9SS1V1WXNF/UmhPRG1reGtaZDgy/cFNIbkZ0REF0Z2J6/Si5qcGc"
    },
    followers: [{
            userId: mongoose_1.default.Types.ObjectId,
            type: String
        }],
    following: [{
            userId: mongoose_1.default.Types.ObjectId,
            type: String
        }],
    links: [{
            type: String
        }],
    gender: {
        type: String
    },
    dateOfBirth: {
        type: Date,
    },
    bio: {
        type: String,
        default: ""
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isLogged: {
        type: Boolean,
        default: false
    }
});
schema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        //password hashing
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        next();
    });
});
schema.methods.comparePassword = function (candidatePassword, dbpswrd) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(candidatePassword, dbpswrd); // Compare candidate password with stored hash
    });
};
exports.userSignupModel = mongoose_1.default.model('userSignup', schema);
