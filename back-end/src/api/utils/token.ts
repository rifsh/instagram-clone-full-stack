import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export const userToken = (id?) => {
    return jwt.sign({ id: id }, process.env.jwt_string, {
        expiresIn: 86400000
    });
}