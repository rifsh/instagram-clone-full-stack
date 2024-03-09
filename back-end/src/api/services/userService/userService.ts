import { NextFunction } from "express"
import { UserProfileInterface } from "../../model/interfaces/userInterfaces"
import { userSignupModel } from "../../model/schemas/userSchema"
import { CustomeError } from "../../utils/customeErrorHandler";
import { ObjectId } from "mongoose";



export const allUsers = async () => {
    const users = userSignupModel.find({});
    return users
}
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
export const userFollowingSrvc = async (followingId: ObjectId, followerId: ObjectId): Promise<boolean> => { 
    try {
        const followingUser = await userSignupModel.findById(followingId);
        const followerUser = await userSignupModel.findById(followerId);
        if (followingUser.following.includes(followerId)) {
            const index: number = followingUser.following.indexOf(followerId);
            followingUser.following.splice(index, 1);
            followingUser.save();
            const indexFollowers = followerUser.followers.indexOf(followerId);
            followerUser.followers.splice(indexFollowers, 1);
            followerUser.save();
            return false;
        } else {
            followingUser.following.push(followerId);
            followingUser.save();
            followerUser.followers.push(followingId);
            followerUser.save();
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    // try {
    //     const followingUser = await userSignupModel.findById(followingId);
    //     const followerUser = await userSignupModel.findById(followerId);

    //     const followerFinding = await followingUser.following.includes(followerId);
    //     if (followerFinding) {
    //         return false;
    //     } else {
    //         if (followerUser && followerUser && !followerUser.followers.includes(followerId)) {
    //             followingUser.following.push(followerId);
    //             followingUser.save();
    //             followerUser.followers.push(followingId);
    //             followerUser.save();
    //             return true
    //         }
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}
export const userUnfollow = async (followingId: ObjectId, followerId: ObjectId) => {
    try {
        const followingUser = await userSignupModel.findById(followingId);
        const followerUser = await userSignupModel.findById(followerId);
        if (followerUser && followerUser) {
            const index: number = followingUser.following.indexOf(followerId);
            followingUser.following.splice(index, 1);
            followingUser.save();
            const indexFollowers = followerUser.followers.indexOf(followerId);
            followerUser.followers.splice(indexFollowers, 1);
            followerUser.save();
            return true;
        }
    } catch (error) {
        console.log(error);
    }
}
export const userFollowersList = async (userId: string, next: NextFunction) => {
    const user = await userSignupModel.findById(userId);
    try {
        if (!user) {
            next(new CustomeError('Something went wrong', 404));
        } else {
            const followrsList = await userSignupModel.findById(userId).populate({
                path: "followers",
                select: ["username", "profilePic", "fullname"],
            })
            return followrsList
        }
    } catch (error) {
        console.log(error);
    }
}
export const userFollowingList = async (userId: string, next: NextFunction) => {
    const user = await userSignupModel.findById(userId);
    try {
        if (!user) {
            next(new CustomeError('Something went wrong', 404));
        } else {
            const followrsList = await userSignupModel.findById(userId).populate({
                path: "following",
                select: ["username", "profilePic", "fullname"],
            })
            return followrsList
        }
    } catch (error) {
        console.log(error);
    }
}
export const userFollowerRemoveSrvc = async (userId: ObjectId, removingId: ObjectId) => {
    const follower = await userSignupModel.findById(userId);
    const following = await userSignupModel.findById(removingId);
    try {
        if (follower && following) {
            const followerIndex: number = follower.followers.indexOf(removingId);
            const followingIndex: number = following.following.indexOf(userId);
            follower.followers.splice(followerIndex, 1);
            follower.save();
            following.following.splice(followingIndex, 1);
            following.save();
            return true;
        } else {
            console.log('no user');
            return false;

        }
    } catch (error) {
        console.log(error);
    }
}
export const userFollowingRemoveSrvc = async (userId: ObjectId, removingId: ObjectId) => {
    const user = await userSignupModel.findById(userId);
    const followingUser = await userSignupModel.findById(removingId);
    try {
        if (user && followingUser) {
            const userFollowingIndex: number = user.following.indexOf(removingId);
            const followerIndex: number = followingUser.followers.indexOf(userId);
            user.following.splice(userFollowingIndex, 1);
            user.save();
            followingUser.followers.splice(followerIndex, 1);
            followingUser.save();
            return true;
        } else {
            console.log('no user');
            return false
        }
    } catch (error) {
        console.log(error);
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
    allUsers,
    userProfileSrvc,
    userProfileImgChangeSrvc,
    userProfileImgRemovesrvc,
    userFollowingSrvc,
    userUnfollow,
    userFollowersList,
    userFollowingList,
    userFollowerRemoveSrvc,
    userFollowingRemoveSrvc,
    userByIdSrvc
}