import { NextFunction, Request, Response } from "express";
import { getSDKFlagsService } from "../services/sdk.service";

export const getSDKFlagsController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const projectID = req.sdk.projectID;
        // console.log("Controller", projectID);
        const data = await getSDKFlagsService(projectID);
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }

}