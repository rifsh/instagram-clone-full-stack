import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { UserSighnupInterface } from "../interfaces/userSighnupInterface";
import { NextFunction } from "express";

const schema = new mongoose.Schema<UserSighnupInterface>({
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
        unique:true

    },
    profilePic:{
        type:String,
        default:"../../../imgs/user.png"
    },
    followers:[{
        userId:mongoose.Types.ObjectId,
        type:String
    }],
    following:[{
        userId:mongoose.Types.ObjectId,
        type:String
    }],
    links:[{
        type:String
    }],
    gender:{
        type:String
    },
    dateOfBirth:{
        type:Date,
    },
    bio:{
        type:String,
        default:""
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


export const userSignupModel = mongoose.model('userSignup', schema);