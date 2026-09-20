import { NextFunction, Request, Response } from "express";
import { acceptInviteService, rejectInviteService } from "../services/invitations.service";

export const acceptInviteController = async (req: Request, res: Response, next: NextFunction) => {

    // will check later whether the user sending accepting req and the person who is being invited are same
    //const userID = req.user.id;

    try {
        const invitationID = Number(req.params.id);
        const data = await acceptInviteService(invitationID);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

export const rejectInviteController = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const invitationID = Number(req.params.id);
        const data = await rejectInviteService(invitationID);
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        next(err);
    }

}