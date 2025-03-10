import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { AppErrorCode } from "../../../exceptions/root";
import { generateAccessToken } from "../../../lib/utils/jwt/generateTokenPair";

export const TokenRefresh = async (req: Request, res: Response, next: NextFunction) => {
    try {

        await z.object({refresh: z.string()}).parseAsync(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    const {refresh} = req.body
    const token = await generateAccessToken(refresh)

    res.json(token)
}