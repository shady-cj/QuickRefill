import { NextFunction, Request, Response } from "express";
import { AppErrorCode } from "../../../exceptions/root";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { z } from "zod";
import { prismaClient } from "../../..";
import { UnauthorizedRequest } from "../../../exceptions/unauthorizedRequests";
import { sendOTP } from "../../../lib/utils/mail/otp";

export const RequestAccountVerify = async (req: Request, res: Response, next: NextFunction) => {
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
    await sendOTP(email)
    res.json({"message": `Email verification otp sent to ${email}`})
}