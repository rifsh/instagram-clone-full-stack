import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { userSighnup } from "../interfaces/userSighnupInterface";
import { NextFunction } from "express";

const schema = new mongoose.Schema<userSighnup>({
    emailOrPhone: {
        type: String,
        required: [true, 'Emial or phone number is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstname: {
        type: String,
        default:''
    },
    lastname: {
        type: String,
        default:''
    },
    createdOn:{
        type:Date,
        default:Date.now()
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    isLogged:{
        type:Boolean,
        default: false
    }
})

schema.pre('save', async function (next: NextFunction) {
    if (!this.isModified('password')) {
        return next()
    }
    //password hashing
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

schema.methods.comparePassword = async function (candidatePassword: string, dbpswrd: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, dbpswrd); // Compare candidate password with stored hash
};


export const userSignupModel = mongoose.model('otpCreation', schema);