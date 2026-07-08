import { NextFunction, Request, Response } from "express";
import { getAllProjectsOfUserService, getProjectInfoService } from "../services/projects.service";
import { getAllEnvironmentsService } from "../services/environments.service";
import { getAllFLagsOfProjectService } from "../services/featureFlag.service";

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


export const getAllEnvironmentsController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const projectID = Number(req.params.id);
        const result = await getAllEnvironmentsService(projectID);
        res.status(200).json(result);
    }
    catch(err){
        next(err);
    }
}

export const getProjectInfoController = async (req:Request, res: Response, next: NextFunction) => {

    try{
        const projectID = Number(req.params.id);
        const result = await getProjectInfoService(projectID);
    }
    catch(err){
        next(err);
    }
}

export const getAllFlagsOfProjectController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const projectID = Number(req.params.id);
        const result = await getAllFLagsOfProjectService(projectID);
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
    }
}