"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const conversationSchema_1 = __importDefault(require("../../model/schemas/conversationSchema"));
const messageSchema_1 = __importDefault(require("../../model/schemas/messageSchema"));
const baseController_1 = require("./baseController");
class MessageController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.sendMessage = ({ sender, receiver, message, roomId }) => __awaiter(this, void 0, void 0, function* () {
            console.log(sender, receiver, message, roomId);
            try {
                let findConversation = yield conversationSchema_1.default.findOne({
                    participants: [sender, receiver]
                });
                if (findConversation === null) {
                    findConversation = yield conversationSchema_1.default.create({
                        participants: [sender, receiver],
                        messages: []
                    });
                }
                const newMessage = yield messageSchema_1.default.create({
                    sender: sender,
                    reciever: receiver,
                    message: message,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                if (findConversation) {
                    findConversation.messages.push(newMessage._id);
                }
                findConversation.save();
                yield newMessage.save();
                this.io.to(roomId).emit("new-message", newMessage);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.MessageController = MessageController;
