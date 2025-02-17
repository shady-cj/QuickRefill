import express from "express"
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import "./redis-init";
import { rootRoutes } from "./routes/root";
import { CustomErrorMiddleware, InternalErrorMiddleware } from "./middlewares/errors";

import swaggerJSDoc from "swagger-jsdoc";
import { API_HOST, API_PORT, CORS_ORIGINS } from "./secrets";

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
            api: `http://${API_HOST}:${API_PORT}`
        }
      ]
    },
    apis: ['./routes*.ts'],
  };
  
const openapiSpecification = swaggerJSDoc(options);


const app = express();
app.use(express.json())

// Helmet setup
app.use(helmet());

// Rate limiter to prevent ddos attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // maximum of 50 request per 15 minutes from a  specific ip address.
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
  });
app.use(limiter);

app.use(cors({
  origin: CORS_ORIGINS
}))




export const prismaClient = new PrismaClient()
app.use(rootRoutes)


// error middlewares
app.use(CustomErrorMiddleware) // 400, 401, 422, 403
app.use(InternalErrorMiddleware) // 500

app.listen(API_PORT, ()=>console.log('working'))