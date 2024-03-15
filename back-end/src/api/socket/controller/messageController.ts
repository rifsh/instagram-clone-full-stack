import { log } from "console";
import conversation from "../../model/schemas/conversationSchema";
import MessageSchema from "../../model/schemas/messageSchema";
import { BaseController } from "./baseController";

export class MessageController extends  BaseController {
    sendMessage = async({sender,receiver,message,roomId})=>{
        console.log(sender,receiver,message,roomId);
        
        try {
            let findConversation = await conversation.findOne({
                participants:[sender,receiver]
            })

            if(findConversation===null){
                findConversation = await conversation.create({
                    participants:[sender,receiver],
                    messages:[]
                })
            }

            const newMessage = await MessageSchema.create({
                sender:sender,
                reciever:receiver,
                message:message,
                createdAt:new Date(),
                updatedAt:new Date()
            })

            if(findConversation){
                findConversation.messages.push(newMessage._id)
            }

            findConversation.save()
            await newMessage.save()

            this.io.to(roomId).emit("new-message",newMessage)
        } catch (error) {
            console.log(error)
        }
    }
}