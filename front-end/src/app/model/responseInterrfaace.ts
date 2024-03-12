export interface ResponseInterface {
    status:string;
    message:string;
}

export interface LoginResponseInterface {
    message:string;
    token:string;
    datas:string
}

export interface StandardResponseInterface {
    message:string;
    datas
}