import { connection } from "./dbconnection";
import app from ".";
import http from 'http'
import { errorHandler } from "./api/middlewares/errorMiddleare";
import { Server } from 'socket.io'

app.use(errorHandler);
connection()

// const httpServer = http.createServer(app);

// const io = new Server(httpServer, {
//     cors: {
//         origin: ["http://localhost:4200"];
//     }
// })


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

