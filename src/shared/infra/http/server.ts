import "reflect-metadata"
import express,{ Request, Response, NextFunction } from "express"
import "express-async-errors"
import { router } from './routes';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import "../../../database"
import "../../container"

import { AppError } from "@shared/errors/AppError";

const app = express();

app.use(express.json());

app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile))

app.use(router)

app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
    

    
    if (err instanceof AppError) {
        return resp.status(err.statusCode).json({
            message: err.message
        })
    }

    return resp.status(500).json({
        status:"error",
        message:`Internal Server Error - ${err.message}`
    })
})

app.listen(3333, () => {
    console.log("running")
})