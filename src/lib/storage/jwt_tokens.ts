import { AppErrorCode } from "../../exceptions/root";
import { UnauthorizedRequest } from "../../exceptions/unauthorizedRequests";
import { redisClient } from "../../redis-init";
import { accessTokenPayload } from "../types/payload";
import { ACCESS_TOKEN_EXPIRES_IN } from "../utils/jwt/generateTokenPair";

export const storeAccessToken = async (accessToken: string, userId: string) => {
    const key = `user:access-token:${userId}`
    await redisClient.set(key, accessToken, {EX: ACCESS_TOKEN_EXPIRES_IN - 60}) // expires in 59 minutes 
}

export const verifyAccessToken = async(userId: string) => {
    const key = `user:access-token:${userId}`
    
    if (await redisClient.exists(key)) {
        const accessToken = await redisClient.get(key)
        return accessToken
    } 
    throw new UnauthorizedRequest("invalid token", AppErrorCode.INVALID_TOKEN)

}