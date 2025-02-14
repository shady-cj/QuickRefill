import jwt from "jsonwebtoken"
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../../secrets";
import { UnauthorizedRequest } from "../../../exceptions/unauthorizedRequests";
import { AppErrorCode } from "../../../exceptions/root";
import { accessTokenPayload } from "../../types/payload";
import { verifyAccessToken } from "../../storage/jwt_tokens";

export const verifyToken = async (token: string, type: "access" | "refresh" = "access"): Promise<accessTokenPayload | never> => {
    const secret = type === "access" ? JWT_ACCESS_SECRET : type === "refresh" ? JWT_REFRESH_SECRET : null
    if (!secret) throw Error
    try {
        const payload = jwt.verify(token, secret) as accessTokenPayload;
        if (type === "access") {
            const accessToken = await verifyAccessToken(payload.userId);
            if (accessToken === token)
                return payload
            throw jwt.TokenExpiredError
        }
        return payload
    } catch (err: any) {
        throw new UnauthorizedRequest(err.message || "invalid token" , AppErrorCode.INVALID_TOKEN)
    }
    
}