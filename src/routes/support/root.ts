import { Router } from "express";
import { feedbackRoutes } from "./feedback";
const supportRoutes = Router()

supportRoutes.use("/feedback/", feedbackRoutes)

export { supportRoutes }