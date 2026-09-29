import { NextFunction, Request, Response } from "express";
import { changeFlagService, createNewFlagService, deleteFlagService, getFlagInfoService, getFlagSummaryService, } from "../services/featureFlag.service";
import { getFlagGuardrailsService } from "../services/guardrails.service";


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

export const getFlagGuardrailsController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const flagID = Number(req.params.id);
        const result = await getFlagGuardrailsService(flagID);
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err)
        next(err);
    }

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