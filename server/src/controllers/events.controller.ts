import { NextFunction, Request, Response } from "express";
import { reportEventsService } from "../services/events.service";

export const reportEventsController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const {key, flagEnvironmentID, eventType, service} = req.body;
        const data = await reportEventsService(key, flagEnvironmentID, eventType, service);
        res.status(202).json(data);
    }
    catch(err){
        next(err);
    }
    
}