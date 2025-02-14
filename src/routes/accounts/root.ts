import { Router } from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";

const accountRoutes = Router()

accountRoutes.use("auth/", authRoutes)
accountRoutes.use("user/", userRoutes)

export {accountRoutes}