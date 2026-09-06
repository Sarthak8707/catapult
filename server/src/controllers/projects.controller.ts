import { NextFunction, Request, Response } from "express";
import { getAllProjectsOfUserService, getProjectInfoService, getRecentActivityService } from "../services/projects.service";

import { createNewFlagService, getAllFLagsOfProjectService } from "../services/featureFlag.service";
import { getGuardrailsService } from "../services/guardrails.service";
import { getProjectMembers } from "../services/members.service";

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

    // try{
    //     const projectID = Number(req.params.id);
    //     const result = await getAllEnvironmentsService(projectID);
    //     res.status(200).json(result);
    // }
    // catch(err){
    //     next(err);
    // }
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

export const createFlagInProjectController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const projectID = Number(req.params.id);
        console.log(req.user)
    const userID = req.user.id;
    const {name, description} = req.body;

    const result = await createNewFlagService(name, description, projectID, userID);

    res.status(201).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "error"})
    }
}

export const getRecentActivityController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const projectID = Number(req.params.id);
        const result = await getRecentActivityService(projectID);
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

export const getGuardrailsController = async (req: Request, res: Response, next: NextFunction) => {

    const projectID = Number(req.params.id);
    const result = await getGuardrailsService(projectID);
    res.status(200).json(result);
}


export const getMembersController = async (req: Request, res: Response, next: NextFunction) => {
    
    const projectID = Number(req.params.id);
    const result = await getProjectMembers(projectID);
    res.status(200).json(result);
    
}


