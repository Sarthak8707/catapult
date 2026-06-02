import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import jwt, { JwtPayload } from "jsonwebtoken"
import { env } from "../config/env";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new AppError("Authentication Required", 401);
        }
        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        const id = decode.id;
        const username = decode.username;

        req.user = {id, username};

        next();

        
    }
    catch (err) {

        next(new AppError("Invalid token", 401));
    }
}