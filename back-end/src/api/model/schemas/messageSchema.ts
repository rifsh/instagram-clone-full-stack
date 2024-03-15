import mongoose from "mongoose";


const schema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'userSignup'
    },
    reciever: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'userSignup'
    },
    message: {
        type: String,
        required: true
    },

}, { timestamps: true });
const MessageSchema = mongoose.model('Message',schema);

export default MessageSchema;