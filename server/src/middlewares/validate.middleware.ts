import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const validate = 
    (schema: z.ZodTypeAny) => 
    (req: Request, res: Response, next: NextFunction) => {

        
        try{
            req.body = schema.parse(req.body);
            next();
        }
        catch(err){
            // send to global error handler via AppError class
            if(err instanceof z.ZodError){
                return next(new AppError("Invalid Schema", 400));
            }

            next(err);
        }
        
}