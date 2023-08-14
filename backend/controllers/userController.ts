import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { compare, genSalt, hash } from "bcrypt";
import { generateJwtToken } from "../authUtils";

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

        const salt = await genSalt(10);
        const hashPassword = await hash(userData.password, salt)

        const user = await prisma.user.create({
            data: {
                login: userData.username,
                password: hashPassword
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


export const login = async (req:Request, res: Response) => {
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

        if(!userCheck)
        {
            res.status(404).json({error: "user not found"});
            return;
        }

        const validPassword = compare(userData.password, userCheck.password)
        if(!validPassword)
            res.status(400).json({error: "invalid username or password"});

        const token = generateJwtToken(userCheck.id, userCheck.login);

        // console.log("token: " + token)
        
        res.status(200).send(token);
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json(error);
        return;
    }
}