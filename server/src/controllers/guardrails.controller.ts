import { NextFunction, Request, Response } from "express";
import { createGuardrailsService, updateGaurdrailsService } from "../services/guardrails.service";

type GuardrailType = {
    name: string,
    description?: string,
    flagEnvironmentID: number,
    service?: string,
    triggerMetric: string[],
    errorThreshold: number,
    actionType: string,
    action: string

}

export const createGuardrailController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const guardrail: GuardrailType = req.body.guardrail;

        const data = await createGuardrailsService(guardrail);
        res.status(201).json(data);
    }
    catch(err){
        console.log(err);
        next(err);
    }

}

export const updateGuardrailController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const guardrail: GuardrailType = req.body.guardrail;

        const data = await updateGaurdrailsService(guardrail);
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}