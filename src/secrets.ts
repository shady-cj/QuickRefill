import 'dotenv/config'

export const DATABASE_URL = process.env.DATABASE_URL
export const REDIS_HOST = process.env.REDIS_HOST
export const REDIS_PORT = +process.env.REDIS_PORT!
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!
export const SMTP_HOST = process.env.SMTP_HOST
export const SMTP_PORT = process.env.SMTP_PORT
export const SMTP_USER = process.env.SMTP_USER
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD
export const EMAIL_FROM = process.env.EMAIL_FROM