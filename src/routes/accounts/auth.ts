import { Request, Response, Router } from "express";
import { Register } from "../../controllers/accounts/auth";

const authRoutes = Router()

// Register a user
authRoutes.post("/register/", Register)


// Verify token sent to email after registration
authRoutes.post("/account-verify/", (req, res, next) => console.log("welcome to account verify route"))


// Login a user
authRoutes.post("/login/", (req, res, next) => console.log("welcome to login routes"))


// Get a new access token with a refresh token
authRoutes.post("/token/refresh/", (req, res, next) => console.log("token/refresh routes"))


// Verify an access token.
authRoutes.post("/token/verify/", (req, res, next) => console.log('token/verify routes'))


// Request code for password reset which will be sent to the user's email
authRoutes.post("/request-password-reset/", (req, res, next)=> console.log('request password reset route'))


// The code sent to the email is verified in this route
authRoutes.post("/verify-password-reset-request", (req, res, next) => console.log('verify password reset request'))


// Finally reset password with a new password 
authRoutes.post("/password-reset-confirm/", (req, res, next) => console.log("reset password route"))

export { authRoutes }