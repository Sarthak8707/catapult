import { NextFunction, Request, Response } from "express"
import { getAllSegmentsService, getSegmentService } from "../services/segments.service";

export const getAllSegmentsController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        
        const projectID = Number(req.params.id);
        const data = await getAllSegmentsService(projectID);
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
    }
}

export const getSegmentController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const id = Number(req.params.id);
        const data = await getSegmentService(id);
        return res.status(200).json(data);
    }
    catch(err){
        console.log(err);
    }
}