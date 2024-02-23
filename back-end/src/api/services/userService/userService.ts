import { NextFunction } from "express"
import { UserProfileInterface } from "../../model/interfaces/userInterfaces"
import { userSignupModel } from "../../model/schemas/userSchema"
import { CustomeError } from "../../utils/customeErrorHandler";


export const userProfileSrvc = async (profileDetails: UserProfileInterface, userId: string, next: NextFunction) => {
    const userFinding = await userSignupModel.findById(userId);
    console.log(userFinding);

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
export const userProfileImgChangeSrvc = async (userid: string, image: string): Promise<boolean> => {
    const user = await userSignupModel.findById(userid);
    try {
        if (!user) {
            return false;
        } else {
            const profilePic = await userSignupModel.findByIdAndUpdate(userid, { $set: { profilePic: image } });
            profilePic.save();
            return true;
        }
    } catch (error) {
        console.log(error);
    }
}
export const userProfileImgRemovesrvc = async (userId: string) => {
    const user = await userSignupModel.findById(userId)
    try {
        if (user) {
            const imgRemove = await userSignupModel.findByIdAndUpdate(userId, { $set: { profilePic: "https://imgs.search.brave.com/NLpgWA-anJ89n8ggNMg1F78gPFBzCLCKFaGd-SBIVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzA5LzU5Lzc1/LzM2MF9GXzUwOTU5/NzUzMl9SS1V1WXNF/UmhPRG1reGtaZDgy/cFNIbkZ0REF0Z2J6/Si5qcGc" } });
            imgRemove.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
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
    userProfileImgChangeSrvc,
    userProfileImgRemovesrvc,
    userByIdSrvc
}