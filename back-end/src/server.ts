import { connection } from "./dbconnection";
import app from ".";
import http from 'http'
import { errorHandler } from "./api/middlewares/errorMiddleare";
import { Server } from 'socket.io';
import socketRoutes from './api/socket/route'

app.use(errorHandler);
connection()

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ["https://instagram-clone-full-stack-2lhn.vercel.app"]
    }
})

io.on("connection",(socket)=>{
    socketRoutes(socket,io)
})

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

