import { connection } from "./dbconnection";
import app from ".";
import http from 'http'
import { errorHandler } from "./api/middlewares/errorMiddleare";
import { Server, Socket } from 'socket.io';
import socketRoutes from './api/socket/route'

app.use(errorHandler);
connection()

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:4200"]
    }
})

io.on("connection",(socket)=>{
    socketRoutes(socket,io)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

