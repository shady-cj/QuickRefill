import { Router } from "express";
import { Authentication } from "../../middlewares/authentication";
import { errorHandler } from "../../lib/handlers/errorHandler";
import { Me, ProfileUpdate } from "../../controllers/root";

const userRoutes = Router()

userRoutes.use([errorHandler(Authentication)])

/**
 * @openapi
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          ProfileData:
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
 *                  profile:
 *                      description: Profile 
 *                      type: string
 */

/**
 * 
 * @openapi
 * /accounts/profile/me:
 *  get:
 *      summary: Fetch user Details
 *      description: Full user profile details can be fetched from this endpoint
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: profile details fetched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/ProfileData'
 *          401:
 *              description: Unauthorized - Authentication failed or token missing
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              errorCode:
 *                                  type: string
 *                              errors:
 *                                  type: "null"
 *                          
 */

// fetch user profile details
userRoutes.get('/me/', errorHandler(Me))
userRoutes.route('/update/').put(errorHandler(ProfileUpdate)).patch(errorHandler(ProfileUpdate))

export { userRoutes }