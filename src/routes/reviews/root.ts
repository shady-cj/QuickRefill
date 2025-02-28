import { Router } from "express";
import { orderFeedbackRoutes } from "./orderFeedback";

const reviewRoutes = Router()

reviewRoutes.use("/feedback/", orderFeedbackRoutes)
export {reviewRoutes}