"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnection_1 = require("./dbconnection");
const _1 = __importDefault(require("."));
const errorMiddleare_1 = require("./api/middlewares/errorMiddleare");
_1.default.use(errorMiddleare_1.errorHandler);
(0, dbconnection_1.connection)();
// const httpServer = http.createServer(app);
// const io = new Server(httpServer, {
//     cors: {
//         origin: ["http://localhost:4200"];
//     }
// })
_1.default.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
