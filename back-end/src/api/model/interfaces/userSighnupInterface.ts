import { ObjectId } from "mongoose";

export interface UserSighnupInterface {
    // phone: '+91';
    email:string;
    password: string;
    fullname:string;
    username:string;
    profilePic:string;
    followers:[ObjectId];
    following:[ObjectId];
    dateOfBirth: Date;
    gender:string;
    links:string
    bio:string;
    createdOn: Date;
    isVerified: boolean;
    isDeleted: boolean;
    isLogged: boolean;
    comparePassword(candidatePwsrd: string, dbPswrd: string): Promise<boolean>;
}
export interface UserDobInterface {
    month: string;
    day: number;
    year: string;
}
export interface UserLoginInterface {
    userEmail:string;
    password: string
}