import { Router } from "express";
import { Authentication } from "../../middlewares/authentication";
import { errorHandler } from "../../lib/handlers/errorHandler";
import { Me, ProfileUpdate } from "../../controllers/root";

const userRoutes = Router()


userRoutes.get('/me/',[errorHandler(Authentication)], errorHandler(Me))
userRoutes.get('/profile/update', [errorHandler(Authentication)], ProfileUpdate)

export { userRoutes }