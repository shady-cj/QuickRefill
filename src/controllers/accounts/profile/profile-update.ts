import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../../lib/types/auth";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { AppErrorCode } from "../../../exceptions/root";
import { ProfileUpdateSchema } from "../../../schemas/profile";
import { prismaClient } from "../../..";
import { sendOTP } from "../../../lib/utils/mail/otp";

export const ProfileUpdate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        await ProfileUpdateSchema.parseAsync(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }

    const data = req.body

    if (data.email) data.emailVerified = false   
    const updatedUser = await prismaClient.user.update({
        where: {
            id: req.user?.id
        },
        data: data
    })
    // await sendOTP(email) if the ui permits this we can do this too i.e send otp to email for immediate verification
    res.json(updatedUser)
}