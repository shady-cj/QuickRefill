import { Router } from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./profile";

const accountRoutes = Router()

accountRoutes.use("/auth/", authRoutes)
accountRoutes.use("/profile/", userRoutes)

export {accountRoutes}

// /auth/register
// /user/me.