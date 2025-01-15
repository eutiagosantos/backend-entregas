import { ErrorRequestHandler, NextFunction, Request, Response } from "express";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(400).json({
            message: err.message
        })
    }
    res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
}
