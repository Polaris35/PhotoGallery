import { sign } from "jsonwebtoken";


export const generateJwtToken = (userId:string, username: string) => {
    const token = sign({ userId, username }, process.env.JWT_SECRET , { expiresIn: '1h' });
    return token;
}