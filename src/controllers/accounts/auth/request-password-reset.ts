import { NextFunction, Request, Response } from "express";
import { AppErrorCode } from "../../../exceptions/root";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { z } from "zod";
import { prismaClient } from "../../..";
import { UnauthorizedRequest } from "../../../exceptions/unauthorizedRequests";
import { sendPasswordResetToken } from "../../../lib/utils/crypto/password-tokens-utils";

export const RequestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await z.object({email: z.string().email()}).parseAsync(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    const {email} = req.body
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {

        throw new UnauthorizedRequest("user does not exist", AppErrorCode.USER_DOES_NOT_EXIST)
    }
    // here check user if email is verified or not.

    await sendPasswordResetToken(email, user.name)
    res.json({
        "status": "Success",
        "message": `Email sent to ${user.name} on ${email}`
    })
    
}