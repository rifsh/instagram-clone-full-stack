"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomeError = void 0;
class CustomeError extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statusCode = statuscode;
        this.status = statuscode >= 400 && statuscode <= 500 ? 'server Error' : 'Client error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomeError = CustomeError;
