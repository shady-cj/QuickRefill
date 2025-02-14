import 'dotenv/config'

export const DATABASE_URL = process.env.DATABASE_URL
export const REDIS_HOST = process.env.REDIS_HOST
export const REDIS_PORT = +process.env.REDIS_PORT!
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!