import { AppErrorCode } from "../../exceptions/root"
import { UnauthorizedRequest } from "../../exceptions/unauthorizedRequests"
import { redisClient } from "../../redis-init"

export const storeCryptoHash = async (key: string, hash: string) => {
    await redisClient.set(key, hash, {EX: 60 * 20}) // 20 minutes
}

export const getCryptoHash = async (key: string) => {
    if (await redisClient.exists(key)) {
        return await redisClient.get(key)
    }
    throw new UnauthorizedRequest("invalid reset token", AppErrorCode.INVALID_TOKEN)
}

export const deleteCryptoHash = async (key: string) => {
    await redisClient.del(key)
}