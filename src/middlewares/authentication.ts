import { NextFunction, Request, Response } from "express";
import { UnauthorizedRequest } from "../exceptions/unauthorizedRequests";
import { AppErrorCode } from "../exceptions/root";
import { verifyToken } from "../lib/utils/jwt/verifyToken";
import { accessTokenPayload } from "../lib/types/payload";
import { AuthenticatedRequest, RequestUser } from "../lib/types/auth";

export const Authentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    
    if (!authorization?.startsWith("Bearer ")) {
        throw new UnauthorizedRequest("User is not authenticated", AppErrorCode.UNAUTHENTICATED)
    } else {

        const accessToken = authorization?.slice(7)
        const {email, role, userId: id} = await verifyToken(accessToken) as accessTokenPayload & {iat: string, exp: string}
        req.user = {
            id,
            role,
            email
        } as RequestUser
        next()
    }
}