import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { db } from "../db/client";
import { sdkKeys } from "../db/schema";
import { eq } from "drizzle-orm";

export const validateSDKKey = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){

            throw new AppError("SDK Key is missing", 401);
        
        }

        const sdkKey = authHeader.split(" ")[1];
        const [k] = await db.select().from(sdkKeys).where(eq(sdkKeys.value, sdkKey));

        if(!k){
            throw new AppError("SDK Key is invalid", 401);
        }

        req.sdk.projectID = k.projectID;
    }
    catch(err){
        next(err);
    }
}