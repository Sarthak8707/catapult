import { NextFunction, Request, Response } from "express";
import { getAllProjectsOfUserService } from "../services/projects.service";

export const getAllProjectsOfUserController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const userID = req.user.id;

        const result = await getAllProjectsOfUserService(userID);

        res.status(200).json(result);
    }
    catch(err){

        next(err);

    }


}