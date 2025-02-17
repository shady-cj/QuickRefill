import { AppErrorCode } from "../../../exceptions/root";
import { UnauthorizedRequest } from "../../../exceptions/unauthorizedRequests";
import { redisClient } from "../../../redis-init";
import { sendMail } from "../../../services/email";

export const generateOTP = Math.floor(1000 + Math.random() * 900000).toString();


// 278302
export const sendOTP = async (email: string) => {
    const otp = generateOTP
    const key = `user:${email}:otp`
    await redisClient.set(key, otp, {EX: 60*10}) // otp 10 minutes
    const subject = "Account Verification Mail"
    const htmlBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Your OTP Code</h2>
        <p>Please use the following OTP to verify your account:</p>
        <h1 style="color: #4a90e2; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
    `

    await sendMail(email, subject, htmlBody)
}

export const verifyOTP = async (email: string, otp: string | number) => {
    const parsedOtp = otp.toString()
    const key = `user:${email}:otp`
    if (await redisClient.exists(key)) {
        const storedOtp = await redisClient.get(key)
        if (storedOtp?.toString() === parsedOtp) {
            await redisClient.del(key)
            return true
        }
    }
    throw new UnauthorizedRequest("invalid / expired otp" , AppErrorCode.INVALID_OTP)
}