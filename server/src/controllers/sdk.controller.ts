import { NextFunction, Request, Response } from "express";
import { getSDKFlagsService } from "../services/sdk.service";

export const getSDKFlagsController = async (req: Request, res: Response, next: NextFunction) => {

    const projectID = Number(req.params.id)

    const data = await getSDKFlagsService(projectID);
    res.status(200).json(data);
    
}