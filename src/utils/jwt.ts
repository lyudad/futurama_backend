import * as jwt from 'jsonwebtoken';

export function encodeJwt(token: string): number{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id }: any = jwt.verify(token, process.env.SECRET);
    return id;
}