export class CustomeError extends Error {
    statusCode:number;
    status:string;
    isOperational:boolean;

    constructor(message:string, statuscode:number) {
        super(message);
        this.statusCode = statuscode;
        this.status = statuscode >= 400 && statuscode <= 500? 'server Error' : 'Client error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}