import { NextFunction, Request, Response } from "express";
import { LoginUserSchema } from "../../../schemas/user";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { AppErrorCode } from "../../../exceptions/root";
import { prismaClient } from "../../..";
import { UnauthorizedRequest } from "../../../exceptions/unauthorizedRequests";
import bcrypt from "bcrypt"
import { generateTokenPair } from "../../../lib/utils/jwt/generateTokenPair";

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await LoginUserSchema.parseAsync(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    const { email, password } = req.body
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {

        throw new UnauthorizedRequest("Incorrect email and/or password", AppErrorCode.USER_DOES_NOT_EXIST)
    } 

    if (!user.isSocialAccount) {
        if (!password)
            throw new UnauthorizedRequest("provide a password to authenticate this account", AppErrorCode.USER_DOES_NOT_EXIST)
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch)
            throw new UnauthorizedRequest("Incorrect email and/or password", AppErrorCode.USER_DOES_NOT_EXIST)
    }

    // Login with jwt
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,

    }
    const token = await generateTokenPair(payload) // refresh and access token
    res.json(token)
    
}