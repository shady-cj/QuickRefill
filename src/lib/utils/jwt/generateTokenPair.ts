import jwt from "jsonwebtoken"
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../../../secrets";
import { verifyToken } from "./verifyToken";
import { accessTokenPayload } from "../../types/payload";
import { storeAccessToken } from "../../storage/jwt_tokens";

export const ACCESS_TOKEN_EXPIRES_IN = 60 * 60 // 1 hour 
export const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 // 1 day


export const generateTokenPair = async (payload: accessTokenPayload) => {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES_IN})
    
    await storeAccessToken(accessToken, payload.userId)
    return {
        accessToken, 
        refreshToken
    }
}

export const generateAccessToken = async (refreshToken: string) => {
    const payload = await verifyToken(refreshToken, "refresh")
    const newPayload = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role
    }
    const accessToken = jwt.sign(newPayload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN});
    await storeAccessToken(accessToken, payload.userId)
    return {accessToken}
    
}