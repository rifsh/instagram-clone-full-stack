import jwt from 'jsonwebtoken';

export const userToken = (id:string) => {
    return jwt.sign({ id: id }, process.env.jwt_string, {
        expiresIn: 86400000
    });
}