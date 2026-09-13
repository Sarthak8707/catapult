import { Request, Response } from "express";
import { changeFlagService, createNewFlagService, deleteFlagService, getFlagInfoService, getFlagSummaryService, } from "../services/featureFlag.service";


// Get info about a certain flag

export const getFlagInfoController = async (req: Request, res: Response) => {
    const flagID = Number(req.params.id);

    const result = await getFlagInfoService(flagID);
    res.status(200).json(result);
    
}

// Get flag summary

export const getFlagSummaryController = async (req: Request, res: Response) => {

    const flagID = Number(req.params.id);

    const result = await getFlagSummaryService(flagID);
    res.status(200).json(result);

}


// Update a flag

export const changeFlag = async (req: Request, res: Response) => {
    const flagID = Number(req.params.id);

    const data = await changeFlagService(req.body, flagID);
    res.json(data);
}

// Delete a flag

export const deleteFlagController = async (req: Request, res: Response) => {
    const flagID = Number(req.params.id);
    const data = await deleteFlagService(flagID);
    res.json(data);
}