import { error } from 'console';
import { NextFunction,Request, Response } from "express"
import ErrorHandler from "../utils/errorHandler"

export const ErrorMiddleware  = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    // wrong mongodb id error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400)
    }
 
    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} enterd`;
        err = new ErrorHandler(message, 400);
    }



    res.status (err.statusCode).json({
        success: false,
        message: err.message
    })
}
