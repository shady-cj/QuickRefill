import jwt from "jsonwebtoken"
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../../secrets";
import { UnauthorizedRequest } from "../../../exceptions/unauthorizedRequests";
import { AppErrorCode } from "../../../exceptions/root";

export const verifyToken = (token: string, type: "access" | "refresh" = "access") => {
    const secret = type === "access" ? JWT_ACCESS_SECRET : type === "refresh" ? JWT_REFRESH_SECRET : null
    if (!secret) throw Error
    try {
        const payload = jwt.verify(token, secret);
        return payload
    } catch (err) {
        throw new UnauthorizedRequest("invalid token", AppErrorCode.INVALID_TOKEN)
    }
    
}