import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../..";
import bcrypt from "bcrypt";
import { BadRequest } from "../../../exceptions/badRequests";
import { AppErrorCode } from "../../../exceptions/root";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { RegisterUserSchema } from "../../../schemas/user";
import { sendOTP } from "../../../lib/utils/mail/otp";

export const Register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        await RegisterUserSchema.parseAsync(req.body) // using zod schema to parse the body
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }

    const {email, password, name, role} = req.body
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    }) 
    if (user) {
        throw new BadRequest("User Already Exists", AppErrorCode.USER_ALREADY_EXIST)
    } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prismaClient.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                role: role
            }
        })
        // console.log("new User", newUser);

        // after creating a user, send an email with an otp to verify.
        await sendOTP(email)
        res.json(newUser)
    }

  
    
}

