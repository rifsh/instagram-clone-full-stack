import { Server, Socket } from 'socket.io'

const socketRoutes = (socket:Socket, io:Server) =>{
    console.log('New user connected to the app', socket.id);
}

export default socketRoutes;