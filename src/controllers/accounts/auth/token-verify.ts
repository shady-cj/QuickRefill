import { NextFunction, Request, Response } from "express"
import { AppErrorCode } from "../../../exceptions/root"
import { UnprocessableEntity } from "../../../exceptions/validation"
import { z } from "zod"
import { verifyToken } from "../../../lib/utils/jwt/verifyToken"

export const TokenVerify = (req: Request, res: Response, next: NextFunction) => {
    try {

        z.object({token: z.string()}).parse(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    const { token } = req.body
    const payload = verifyToken(token)

    res.json(payload)
}