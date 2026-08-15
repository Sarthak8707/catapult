import { NextFunction, Request, Response } from "express"
import { getAllSegmentsService } from "../services/segments.service";

export const getAllSegmentsController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const id = Number(req.params.id);

    const data = await getAllSegmentsService(id);
    res.status(200).json(data);
    }
    catch(err){
        console.log(err);
    }
}