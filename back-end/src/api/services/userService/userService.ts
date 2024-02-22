import { NextFunction } from "express"
import { UserProfileInterface } from "../../model/interfaces/userInterfaces"
import { userSignupModel } from "../../model/schemas/userSchema"
import { CustomeError } from "../../utils/customeErrorHandler";


export const userProfileSrvc = async (profileDetails: UserProfileInterface, userId: string, next: NextFunction) => {
    const userFinding = await userSignupModel.findById(userId);
    if (userFinding.username === profileDetails.username) {
        return next(new CustomeError('Username is already present', 404));
    }
    try {
        if (!profileDetails) {
            return false
        } else {
            const profileUpdated = await userSignupModel.findByIdAndUpdate(userId, {
                $set: {
                    fullname: profileDetails.fullname,
                    username: profileDetails.username,
                    profilePic: profileDetails.image,
                    links: profileDetails.links,
                    bio: profileDetails.bio,
                    gender: profileDetails.gender
                }
            }, { new: true })
            profileUpdated.save();
            return profileUpdated
        }
    } catch (error) {
        console.log(error.message);
    }
}
export const userByIdSrvc = async (usrId: string, next: NextFunction) => {
    const users = await userSignupModel.findById(usrId);
    if (!users) {
        next(new CustomeError(`User is not present in the database with id '${usrId}' `, 404));
    } else {
        return users;
    }
}



export const userService = {
    userProfileSrvc,
    userByIdSrvc
}