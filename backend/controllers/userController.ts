import { Request, Response } from "express";
import prisma from "../prisma/prisma";

type User = {
    username: string;
    password: string;
}

export const registration = async (req:Request, res:Response)=> {
    try {
        const userData:User = {...req.body} as User;
        console.log(userData);
        const user = await prisma.user.create({
            data: {
                login: userData.username,
                password: userData.password
            }
        });
        console.log(user);
        res.status(200).send("test ok");
    }
    catch(error) {
        res.status(400).send(error);
    }
}