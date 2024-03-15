export interface MessageInterface {
    _id:string;
    createdAt:Date;
    message:string;
    reciever:string;
    sender:string;
    updatedAt:Date;
}

export interface MessageResponseInterface {
    message:MessageInterface[]
}