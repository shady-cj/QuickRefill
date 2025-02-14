import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { AppErrorCode } from "../../../exceptions/root";
import { generateAccessToken } from "../../../lib/utils/jwt/generateTokenPair";

export const TokenRefresh = (req: Request, res: Response, next: NextFunction) => {
    try {

        z.object({refresh: z.string()}).parse(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    const {refresh} = req.body
    const token = generateAccessToken(refresh)

    res.json(token)
}