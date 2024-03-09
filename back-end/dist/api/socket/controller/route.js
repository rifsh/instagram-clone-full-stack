"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketRoutes = (socket, io) => {
    console.log('New user connected to the app', socket.id);
};
exports.default = socketRoutes;
