import { NextFunction, Request, Response } from "express";
import { getAllOrganizationsService, getOrganizationInfoService } from "../services/organizations.service";
import { getAllProjectsService } from "../services/projects.service";

export const getAllOrganizationsController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userID = req.user.id;

    const result = await getAllOrganizationsService({userID}) ;
    console.log(req.user.username)
    return res.status(200).json(result);
    }
    catch(err){
        next(err);
    }
    
}

export const getOrganizationInfoController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const organizationID = Number(req.params.id);
   
    const userID = req.user.id;
    

    const result = await getOrganizationInfoService({organizationID, userID});

    return res.status(200).json(result);
    }
    catch(err){
        next(err)
    }
}

export const getAllProjectsController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const organizationID = Number(req.params.id);
    
    const result = await getAllProjectsService({organizationID});

    return res.status(200).json(result);
    }
    catch(err){
        next(err);
    }
}