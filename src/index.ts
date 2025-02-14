import express, { Request, Response } from "express"
import { redisClient } from "./redis-init";
import { rootRoutes } from "./routes/root";
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("hello world")
})
app.use(rootRoutes)

app.listen(4000, ()=>console.log('working'))