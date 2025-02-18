import { NextFunction, Request, Response, Router } from "express";
import { Authentication } from "../../middlewares/authentication";
import { errorHandler } from "../../lib/handlers/errorHandler";
import { AuthenticatedRequest } from "../../lib/types/auth";
import { Me } from "../../controllers/root";

const userRoutes = Router()


userRoutes.get('/me/',[errorHandler(Authentication)], errorHandler(Me))

export { userRoutes }