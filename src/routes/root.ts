// Root route for combining all the routes
import { Router } from "express";
import { accountRoutes } from "./accounts/root";
import { supportRoutes } from "./support/root";
import { reviewRoutes } from "./reviews/root";

const rootRoutes = Router()

rootRoutes.use('/accounts/', accountRoutes)
rootRoutes.use('/support/', supportRoutes)
rootRoutes.use('/reviews/', reviewRoutes)
// rootRoutes.use("/orders", ordersRoutes)

export { rootRoutes }

// accounts/auth/register
// accounts/user/register