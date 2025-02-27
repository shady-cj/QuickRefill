import { Router } from "express";
import { Authentication } from "../../middlewares/authentication";
import { errorHandler } from "../../lib/handlers/errorHandler";
import { GetFeedbacks, PostFeedback } from "../../controllers/root";
import { RoleBasedAccess } from "../../middlewares/permissions";

const feedbackRoutes = Router();
feedbackRoutes.use([errorHandler(Authentication)])



/**
 * @openapi
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schema:
 *          feedback:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                  userId:
 *                      type: string
 *                  comment:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *              
 */


/**
 * 
 * @openapi
 * /support/feedback:
 *  get:
 *      summary: Fetch feedbacks from customers
 *      description: Admin can fetch feedback from customers
 *      parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Maximum number of resources to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for the resource
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: feedbacks fetched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/feedback'
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
 *  post:
 *      summary: Create feedback
 *      description: Customers can post feedbacks
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          comment:
 *                              type: string
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          201:
 *              description: feedbacks created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/feedback'
 * 
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

feedbackRoutes.route("/")
    .get([errorHandler(RoleBasedAccess(["ADMIN"]))], errorHandler(GetFeedbacks))
    .post([errorHandler(RoleBasedAccess(["ADMIN", "CUSTOMER"]))], errorHandler(PostFeedback))

export {feedbackRoutes}