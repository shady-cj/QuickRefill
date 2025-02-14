import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../..";

export const Register = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password, name} = req.body
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    }) 
    if (user) {
        res.json({'error': "user already exists"})
    } else {
        const newUser = await prismaClient.user.create({
            data: {
                email: email,
                password: password,
                name: name,
            }
        })
    }
        
    console.log("user", user)

    res.json("in progress")
}

