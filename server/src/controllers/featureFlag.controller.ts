import { Request, Response } from "express";
import { getAllFlagsService } from "../services/featureFlag.service";


export const getAllFlags = async (req: Request, res: Response) => {
    const data = await getAllFlagsService();
    res.json(data);
}


export const createNewFlag = async (req: Request, res: Response) => {
   // const 
} 