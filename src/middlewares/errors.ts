import { NextFunction, Request, Response } from "express";
import { AppErrorCode, BaseHttpException } from "../exceptions/root";

export const CustomErrorMiddleware = (error: BaseHttpException | Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof BaseHttpException) {
        res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode,
            errors: error.errors
        })
    }
    else {
        // forward error to internalErrorMiddleware
        next(error)
    }

}

// uncaught errors 
export const InternalErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    res.status(500).json({
        message: "Something went wrong", 
        errorCode: AppErrorCode.INTERNAL_EXCEPTION,
    })

}