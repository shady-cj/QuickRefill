import express from "express"
import { PrismaClient } from "@prisma/client";
import "./redis-init";
import { rootRoutes } from "./routes/root";
import { CustomErrorMiddleware, InternalErrorMiddleware } from "./middlewares/errors";
import swaggerJSDoc from "swagger-jsdoc";
import { API_PORT } from "./secrets";

// swagger ui initializations 
const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Quicrefill rest api',
        version: '1.0.0',
      },
      servers: [
        {
            api: "http://localhost"
        }
      ]
    },
    apis: ['./routes*.ts'],
  };
  
const openapiSpecification = swaggerJSDoc(options);

const app = express();
app.use(express.json())



export const prismaClient = new PrismaClient()
app.use(rootRoutes)


// error middlewares
app.use(CustomErrorMiddleware)
app.use(InternalErrorMiddleware)

app.listen(API_PORT, ()=>console.log('working'))