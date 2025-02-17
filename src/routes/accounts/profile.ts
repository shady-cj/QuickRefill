import { Router } from "express";

const userRoutes = Router()


userRoutes.get('/me/', (req, res, next) => {
    console.log("user me route")
    res.json([{
        "message": "you got the user profile right here.",
        "status": "successful",
        "number": 24
    }])
})

export { userRoutes }