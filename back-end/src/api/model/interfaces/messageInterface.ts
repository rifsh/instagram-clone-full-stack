import { ObjectId } from "mongoose";

export interface ConversationInterface {
    participants:ObjectId[],
    messages:ObjectId[],
    save();
}