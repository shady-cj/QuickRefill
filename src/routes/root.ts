// Root route for combining all the routes
import { Router } from "express";
import { accountRoutes } from "./accounts/root";

const rootRoutes = Router()

rootRoutes.use('accounts/', accountRoutes)

export { rootRoutes }