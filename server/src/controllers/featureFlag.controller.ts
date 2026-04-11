import { Request, Response } from "express";
import { changeFlagService, createNewFlagService, deleteFlagService, getAllFlagsService } from "../services/featureFlag.service";


// Get all flags

export const getAllFlags = async (req: Request, res: Response) => {
    const data = await getAllFlagsService();
    res.json(data);
}

// Create a new flag

export const createNewFlag = async (req: Request, res: Response) => {
    const {name, enabled, environmentID, rolloutPercentage} = req.body;
    const data = createNewFlagService(name, enabled, environmentID, rolloutPercentage);
    res.json(data);
} 

// Update a flag

export const changeFlag = async (req: Request, res: Response) => {
    const flagID = Number(req.params.id);
    //const newData = req.body.newData;
    const data = await changeFlagService(flagID);
    res.json(data);
}

// Delete a flag

export const deleteFlag = async (req: Request, res: Response) => {
    const flagID = Number(req.params.id);
    const data = await deleteFlagService(flagID);
    res.json(data);
}