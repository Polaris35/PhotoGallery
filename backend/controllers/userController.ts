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

        if(!userData || userData.username.length < 4 ||
            userData.password.length < 8)
        {
            res.status(400).json({error: "invalid user data"});
            return;
        }

        const userCheck = await prisma.user.findUnique({
            where: {
                login: userData.username,
        },
        });
        if(userCheck){
            res.status(409).json({error: "user with this username already exist"});
            return;
        }
        
        const user = await prisma.user.create({
            data: {
                login: userData.username,
                password: userData.password
            }
        });
        res.status(200).send("user successfuly added!");
        return;
    }
    catch(error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }
}

const login = async (req:Request, res: Response) => {
    try {
        

    }
    catch(error)
    {
        console.log(error);
        res.status(400).json(error);
        return;
    }
}