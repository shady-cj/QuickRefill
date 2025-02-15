import { Request, Response, Router } from "express";

import { errorHandler } from "../../lib/handlers/errorHandler";
import { 
    AccountVerify,
    Login, 
    PasswordReset, 
    Register, 
    RequestAccountVerify, 
    RequestPasswordReset, 
    TokenRefresh, 
    TokenVerify 
} from "../../controllers/root";

const authRoutes = Router()

// Register a user
authRoutes.post("/register/", errorHandler(Register))


// Verify token sent to email after registration
authRoutes.post("/account-verify/", errorHandler(AccountVerify))


// Request email verification
authRoutes.post("/request-account-verify", errorHandler(RequestAccountVerify))


// Login a user
authRoutes.post("/login/", errorHandler(Login))


// Get a new access token with a refresh token
authRoutes.post("/token/refresh/", errorHandler(TokenRefresh))


// Verify an access token.
authRoutes.post("/token/verify/", errorHandler(TokenVerify))


// Request code for password reset which will be sent to the user's email
authRoutes.post("/request-password-reset/", errorHandler(RequestPasswordReset))


// Finally reset password with a new password 
authRoutes.post("/password-reset/", errorHandler(PasswordReset))

export { authRoutes }