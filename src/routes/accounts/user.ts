import { Router } from "express";

const userRoutes = Router()

userRoutes.get('me/', (req, res, next) => console.log("user me route"))

export { userRoutes }