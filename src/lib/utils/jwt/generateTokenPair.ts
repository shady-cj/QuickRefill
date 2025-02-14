import jwt from "jsonwebtoken"
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../../secrets";
import { verifyToken } from "./verifyToken";

export const ACCESS_TOKEN_EXPIRES_IN = 60 * 60 // 1 hour 
export const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 // 1 day


export const generateTokenPair = (payload: {email: string, userId: string, role: string}) => {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES_IN})
    return {
        accessToken, 
        refreshToken
    }
}

export const generateAccessToken = (refreshToken: string) => {
    const payload = verifyToken(refreshToken, "refresh")
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN});

    return {accessToken}
    
}