import { NextFunction, Request, Response } from "express";
import { AppErrorCode } from "../../../exceptions/root";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { z } from "zod";
import { prismaClient } from "../../..";
import { UnauthorizedRequest } from "../../../exceptions/unauthorizedRequests";
import { verifyOTP } from "../../../lib/utils/mail/otp";

export const AccountVerify = async(req: Request, res: Response, next: NextFunction) => {
    try {
        await z.object({
            email: z.string().email(),
            otp: z.string().or(z.number())
        }).parseAsync(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    const {email, otp} = req.body
    // console.log('got here', email, otp)

    const user = await prismaClient.user.findUnique({
        where: {
            email: email,
            emailVerified: false,
        }
    })
    if (!user) {

        throw new UnauthorizedRequest("user does not exist or already verified", AppErrorCode.USER_DOES_NOT_EXIST)
    }
    const isVerified = await verifyOTP(email, otp)
    if (isVerified) {
        const updatedUser = await prismaClient.user.update({
            where: {
                email: email,
            }, 
            data: {
                emailVerified: true
            }
        })
        return res.json(updatedUser)
    } else throw new UnauthorizedRequest("Invalid OTP", AppErrorCode.INVALID_OTP)

}