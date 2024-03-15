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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const baseController_1 = require("./baseController");
class RoomController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.joinRoom = (roomId) => __awaiter(this, void 0, void 0, function* () {
            console.log(roomId);
            this.socket.join(roomId);
        });
    }
}
exports.RoomController = RoomController;
