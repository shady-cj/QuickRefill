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

/**
 * @openapi
 *  components:
 *      schemas:
 *          UserData:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                  role:
 *                      type: string
 *                      enum: ['CUSTOMER', 'VENDOR', 'ADMIN', 'DELIVERY_REP']
 *                      description: Roles is from one of those.
 *                  email:
 *                      type: string
 *                  password:
 *                      oneOf:
 *                          - type: string
 *                          - type: "null"
 *                      description: For social accounts no password.
 *                  isSocialAccount:
 *                      type: boolean
 *                  socialAccountProvider:
 *                      oneOf:
 *                          - type: string
 *                          - type: "null"
 *                      enum: ['FACEBOOK', 'GOOGLE']
 *                  name: 
 *                      type: string
 *                  inviteCode:
 *                      oneOf:
 *                          - type: string
 *                          - type: "null"
 *                      description: Response data that could be a string or null
 *                  publicKey:
 *                      oneOf:
 *                          - type: string
 *                          - type: "null"
 *                      description: Response data that could be a string or null
 *                  address:
 *                      oneOf:
 *                          - type: string
 *                          - type: "null"
 *                      description: Response data that could be a string or null
 *                  phoneNumber:
 *                      oneOf:
 *                          - type: string
 *                          - type: "null"
 *                      description: Response data that could be a string or null
 *                  avatar:
 *                      oneOf:
 *                          - type: string
 *                          - type: "null"
 *                      description: Response data that could be a string or null
 *                  emailVerified:
 *                      type: boolean
 *                  createdAt:
 *                      type: string
 *                  updatedAt:
 *                      type: string
 *          SignUpData:
 *              type: object
 *              required:
 *                  - email
 *                  - name
 *                  - role
 *                  - isSocialAccount
 *              properties:
 *                  email: 
 *                      type: string
 *                  password:
 *                      oneOf:
 *                          - type: string
 *                          - type: "null"
 *                      description: password must be minimum of 6 characters (don't pass a password if isSocialLogin is true)
 *                  name:
 *                      type: string
 *                  role:
 *                      type: string
 *                      enum: ['CUSTOMER', 'VENDOR', 'ADMIN', 'DELIVERY_REP']
 *                  isSocialAccount:
 *                      type: boolean
 *                      description: if registration is through social logins (google, facebook)
 *                  socialAccountProvider:
 *                      type: string
 *                      enum: ['FACEBOOK', 'GOOGLE']
 *                      description: The provider for social login (Don't provider if account is not through social accounts)
 *                  address:
 *                      oneOf:
 *                          - type: "null"
 *                          - type: string
 *                  phoneNumber:
 *                      oneOf:
 *                          - type: "null"
 *                          - type: string
 */

/**
 * 
 * @openapi
 * /accounts/auth/register:
 *  post:
 *      summary: Sign up a User
 *      description: An endpoint to sign up or register a user
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/SignUpData'
 *                  examples:
 *                      withoutSocialAccount:
 *                          value:
 *                              email: "test@test.com"
 *                              name: "John Doe"
 *                              password: "password"
 *                              role: "CUSTOMER"
 *                              isSocialAccount: false
 *                          summary: example of registering a user without social account
 *                      withSocialAccount:
 *                          value:
 *                              email: "test@test.com"
 *                              name: "John Doe"
 *                              role: "CUSTOMER"
 *                              isSocialAccount: true
 *                              socialAccountProvider: "GOOGLE"
 *                          summary: example of registering a user with social account
 *      responses:
 *          201:
 *              description: A successful user sign up 
 *              content:   
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/UserData'
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              errorCode:
 *                                  type: number
 *                              errors:
 *                                  type: "null"
 *                          example:
 *                              message: "User Already Exists"
 *                              errorCode: 1002
 *                              errors: null                    
 *          500:
 *              description: Internal failure
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message: 
 *                                  type: string
 *                              errorCode: 
 *                                  type: number
 *                      example:
 *                          errorCode: 3001
 *                          message: "something went wrong"
 */

authRoutes.post("/register/", errorHandler(Register))


/**
 * @openapi
 * /accounts/auth/account-verify/:
 *  post:
 *      summary: Verify email by submitting otp sent to email
 *      description: After sign up or account verification is requested from (/accounts/auth/request-verify), verify the otp sent to email here so as to verify email address
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          otp:
 *                              type: number
 *                              description: 4 digit otp
 *                      example:
 *                          email: "test@test.com"
 *                          otp: 4201
 *      responses:
 *          200:
 *              description: successful email verification
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#components/schemas/UserData'
 *                          
 */

// Verify token sent to email after registration
authRoutes.post("/account-verify/", errorHandler(AccountVerify))


/**
 * @openapi
 * /accounts/auth/request-account-verify/:
 *  post:
 *      summary: Request for otp to verify user email (if not verified)
 *      description: To verify user email after registration, provide the user email for verification
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                      example:
 *                          email: "test@test.com"
 *      responses:
 *          200:
 *              description: Otp sent to email successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example:
 *                              message: "Email verification otp sent to test@test.com"
 *                          
 */
// Request email verification
authRoutes.post("/request-account-verify", errorHandler(RequestAccountVerify))


/**
 * @openapi
 * /accounts/auth/login/:
 *  post:
 *      summary: Authenticate a user
 *      description: Authenticate user to get access and refresh tokens, For now refresh token lasts for 1 day, while access token lasts for 1 hour
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          email: "test@test.com"
 *                          password: "password"
 *      responses:
 *          200:
 *              description: User Logged in successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              accessToken:
 *                                  type: string
 *                              refreshToken:
 *                                  type: string
 *                          example:
 *                              accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZmQ2ZmQ3Yy04ODM0LTQ1ZDAtYTIyMC1kN2FjMmNlMzQ1OGQiLCJlbWFpbCI6ImRkZEBnbWFpbC5jb20iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3Mzk4MjYwMzksImV4cCI6MTczOTgyOTYzOX0.QrPcsWFPVZ8sbzm5H9BG6I9b2wsl0sME9IgsP6p_R3Y"
 *                              refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZmQ2ZmQ3Yy04ODM0LTQ1ZDAtYTIyMC1kN2FjMmNlMzQ1OGQiLCJlbWFpbCI6ImRkZEBnbWFpbC5jb20iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3Mzk4MjYwMzksImV4cCI6MTczOTkxMjQzOX0.UxsPdZcbFiPS7uyVKXj1W785kyT4PfFxjy1lfVyUNuc"
 *                
 *                          
 */

// Login a user
authRoutes.post("/login/", errorHandler(Login))




/**
 * @openapi
 * /accounts/auth/token/refresh/:
 *  post:
 *      summary: Request new access token with refresh token
 *      description: Refresh token can be used to get a new access token, this endpoint allows user to request new access token if refresh token is still active
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          refresh:
 *                              type: string
 *                      example:
 *                          refresh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZmQ2ZmQ3Yy04ODM0LTQ1ZDAtYTIyMC1kN2FjMmNlMzQ1OGQiLCJlbWFpbCI6ImRkZEBnbWFpbC5jb20iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3Mzk4MjYwMzksImV4cCI6MTczOTkxMjQzOX0.UxsPdZcbFiPS7uyVKXj1W785kyT4PfFxjy1lfVyUNuc"
 *      responses:
 *          200:
 *              description: New access token generated
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              accessToken:
 *                                  type: string
 *                          example:
 *                              accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZmQ2ZmQ3Yy04ODM0LTQ1ZDAtYTIyMC1kN2FjMmNlMzQ1OGQiLCJlbWFpbCI6ImRkZEBnbWFpbC5jb20iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3Mzk4MjYwMzksImV4cCI6MTczOTgyOTYzOX0.QrPcsWFPVZ8sbzm5H9BG6I9b2wsl0sME9IgsP6p_R3Y"
 *                          
 */
// Get a new access token with a refresh token
authRoutes.post("/token/refresh/", errorHandler(TokenRefresh))


// Verify an access token.
authRoutes.post("/token/verify/", errorHandler(TokenVerify))



/**
 * @openapi
 * /accounts/auth/request-password-reset/:
 *  post:
 *      summary: Change a registered user's password
 *      description: Provide user email to change their password, a verification link is sent to their email.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                      example:
 *                          email: "test@test.com"
 *      responses:
 *          200:
 *              description: Password request made successfully and verification link with token appended has been sent to the user's email.
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              status:
 *                                  type: string
 *                          example:
 *                              message: "Email sent to testuser on test@test.com"
 *                              status: "Success"
 *                          
 */
// Request code for password reset which will be sent to the user's email
authRoutes.post("/request-password-reset/", errorHandler(RequestPasswordReset))




/**
 * @openapi
 * /accounts/auth/password-reset/:
 *  post:
 *      summary: Reset password endpoint
 *      description: Token appended in the verification link sent to the email after request password reset is sent as a post request to this endpoint along side the new password to finally change the password.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          token:
 *                              type: string
 *                          password:
 *                              type: string
 *                          
 *                      example:
 *                          email: "test@test.com"
 *                          token: "jsofu309248029jt420t0j02ry020tr02hr03hfa0jf302jr23jr02jr302jr023425rifqnfqfnfvqnfqrfq"
 *                          password: "newpassword"
 *      responses:
 *          200:
 *              description: Password reset is successful
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              status: 
 *                                  type: string
 *                          example:
 *                              status: "Successful"
 *                              message: "Password reset successful"
 *                          
 */
// Finally reset password with a new password 
authRoutes.post("/password-reset/", errorHandler(PasswordReset))

export { authRoutes }