import mongoose from "mongoose";


const schema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSignup',
    },
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSignup',
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSignup',
    }
})

const userFollowListModel = mongoose.model('followList', schema);

export default userFollowListModel;