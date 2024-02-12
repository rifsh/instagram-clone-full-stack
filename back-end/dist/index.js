"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = require("./api/router/authRouter");
const customeErrorHandler_1 = require("./api/utils/customeErrorHandler");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./api/router/userRouter");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/clone', authRouter_1.userAuthRouter, userRouter_1.userRouter);
app.all('*', (req, res, next) => {
    const err = new customeErrorHandler_1.CustomeError(`Can't find url '${req.originalUrl}' on the server!`, 404);
    next(err);
});
exports.default = app;
