"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnection_1 = require("./dbconnection");
const _1 = __importDefault(require("."));
const http_1 = __importDefault(require("http"));
const errorMiddleare_1 = require("./api/middlewares/errorMiddleare");
const socket_io_1 = require("socket.io");
const route_1 = __importDefault(require("./api/socket/route"));
_1.default.use(errorMiddleare_1.errorHandler);
(0, dbconnection_1.connection)();
const httpServer = http_1.default.createServer(_1.default);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["https://instagram-clone-full-stack-2lhn.vercel.app"]
    }
});
io.on("connection", (socket) => {
    (0, route_1.default)(socket, io);
});
httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
