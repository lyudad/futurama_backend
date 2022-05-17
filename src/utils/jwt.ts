import * as jwt from 'jsonwebtoken';

export function encodeJwt(token: string){
    const {id}: any = jwt.verify(token, process.env.SECRET);
    return id;
}