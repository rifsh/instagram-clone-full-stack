import { Server, Socket } from 'socket.io'
import { MessageController } from './controller/messageController';
import { RoomController } from './controller/roomController';

const socketRoutes = (socket:Socket, io:Server) =>{
    console.log('New user connected to the app', socket.id);
    const messageController = new MessageController(socket,io)
    const roomController = new RoomController(socket,io)
    socket.on("send-message",messageController.sendMessage)
    socket.on("join-room",roomController.joinRoom)
}

export default socketRoutes;