import { NextFunction, Request, Response } from "express";
import { getAllOrganizationsService } from "../services/organizations.service";

export const getAllOrganizationsController = async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.user.id;

    const result = await getAllOrganizationsService({userID}) ;

    return res.json(result);
    
}

export const getOrganizationInfoController = async (req: Request, res: Response, next: NextFunction) => {
    const organizationID = req.body.organizationID;

    const result = await ( () => {});

}