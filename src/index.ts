import express from "express"
import { PrismaClient } from "@prisma/client";
import "./redis-init";
import { rootRoutes } from "./routes/root";
const app = express();
app.use(express.json())

app.use(rootRoutes)
export const prismaClient = new PrismaClient()

app.listen(4000, ()=>console.log('working'))