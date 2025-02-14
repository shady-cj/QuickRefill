import express from "express"
import { PrismaClient } from "@prisma/client";
import "./redis-init";
import { rootRoutes } from "./routes/root";
import { CustomErrorMiddleware, InternalErrorMiddleware } from "./middlewares/errors";
const app = express();
app.use(express.json())


export const prismaClient = new PrismaClient()
app.use(rootRoutes)


// error middlewares
app.use(CustomErrorMiddleware)
app.use(InternalErrorMiddleware)

app.listen(4000, ()=>console.log('working'))