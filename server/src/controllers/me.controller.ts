import { NextFunction, Request, Response } from "express";
import { getInvitationsOfUserService } from "../services/invitations.service";

export const getInvitationsOfUserController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userID = req.user.id;
        console.log("userID::::", userID);
        
        const data = await getInvitationsOfUserService(userID);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err)
    }

}