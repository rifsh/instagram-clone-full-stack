"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messageController_1 = require("./controller/messageController");
const roomController_1 = require("./controller/roomController");
const socketRoutes = (socket, io) => {
    console.log('New user connected to the app', socket.id);
    const messageController = new messageController_1.MessageController(socket, io);
    const roomController = new roomController_1.RoomController(socket, io);
    socket.on("send-message", messageController.sendMessage);
    socket.on("join-room", roomController.joinRoom);
};
exports.default = socketRoutes;
