import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppErrorCode } from "../../../exceptions/root";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { prismaClient } from "../../..";
import { UnauthorizedRequest } from "../../../exceptions/unauthorizedRequests";
import { validateResetToken } from "../../../lib/utils/crypto/password-tokens-utils";
import bcrypt from "bcrypt"

export const PasswordReset = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await z.object({
            email: z.string().email(), 
            token: z.string(),
            password: z.string().min(6)
        }).parseAsync(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    const {email, token, password} = req.body
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {

        throw new UnauthorizedRequest("user does not exist", AppErrorCode.USER_DOES_NOT_EXIST)
    }

    const isTokenValid = await validateResetToken(email, token)
    if (isTokenValid) {
        //reset password
        const newPasswordHash = await bcrypt.hash(password, 10)
        await prismaClient.user.update({
            where: {
                email: email
            },
            data: {
                password: newPasswordHash
            }
        })
        res.json({"status": "successfully", "message": "password reset successful"})
    } else {
        throw new UnauthorizedRequest("Invalid reset token", AppErrorCode.INVALID_TOKEN)
    }
}