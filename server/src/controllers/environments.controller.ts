import { NextFunction, Request, Response } from "express";
import { getAllFlagsOfEnvironmentService } from "../services/featureFlag.service";

export const getAllFlagsOfEnvironmentController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const environmentID = Number(req.params.id);
        const result = await getAllFlagsOfEnvironmentService(environmentID);
        res.status(200).json(result);

    }
    catch(err){
        next(err);
    }
    
}