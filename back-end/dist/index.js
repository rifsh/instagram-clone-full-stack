"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userrouter_1 = require("./api/router/userrouter");
const customeErrorHandler_1 = require("./api/utils/customeErrorHandler");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use('/linkedin', userrouter_1.userRouter);
app.all('*', (req, res, next) => {
    const err = new customeErrorHandler_1.CustomeError(`Can't find url '${req.originalUrl}' on the server!`, 404);
    next(err);
});
exports.default = app;
