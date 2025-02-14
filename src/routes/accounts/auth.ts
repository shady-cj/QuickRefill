import { Request, Response, Router } from "express";

import { errorHandler } from "../../lib/handlers/errorHandler";
import { 
    Login, 
    Register, 
    TokenRefresh, 
    TokenVerify 
} from "../../controllers/root";

const authRoutes = Router()

// Register a user
authRoutes.post("/register/", errorHandler(Register))


// Verify token sent to email after registration
authRoutes.post("/account-verify/", (req, res, next) => console.log("welcome to account verify route"))


// Login a user
authRoutes.post("/login/", errorHandler(Login))


// Get a new access token with a refresh token
authRoutes.post("/token/refresh/", errorHandler(TokenRefresh))


// Verify an access token.
authRoutes.post("/token/verify/", errorHandler(TokenVerify))


// Request code for password reset which will be sent to the user's email
authRoutes.post("/request-password-reset/", (req, res, next)=> console.log('request password reset route'))


// The code sent to the email is verified in this route
authRoutes.post("/verify-password-reset-request", (req, res, next) => console.log('verify password reset request'))


// Finally reset password with a new password 
authRoutes.post("/password-reset-confirm/", (req, res, next) => console.log("reset password route"))

export { authRoutes }