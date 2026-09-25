import { NextFunction, Request, Response } from "express";
import { getAllProjectsOfUserService, getProjectInfoService, getRecentActivityService } from "../services/projects.service";

import { createNewFlagService, getAllFLagsOfProjectService } from "../services/featureFlag.service";
import { getGuardrailsService } from "../services/guardrails.service";
import { getProjectMembers } from "../services/members.service";
import { getInvitationsOfProjectService, inviteUserService } from "../services/invitations.service";
import { createSegmentService } from "../services/segments.service";

export const getAllProjectsOfUserController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userID = req.user.id;

        const result = await getAllProjectsOfUserService(userID);

        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }

}


export const getAllEnvironmentsController = async (req: Request, res: Response, next: NextFunction) => {

    // try{
    //     const projectID = Number(req.params.id);
    //     const result = await getAllEnvironmentsService(projectID);
    //     res.status(200).json(result);
    // }
    // catch(err){
    //     next(err);
    // }
}

export const getProjectInfoController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const projectID = Number(req.params.id);
        const result = await getProjectInfoService(projectID);
    }
    catch (err) {
        next(err);
    }
}

export const getAllFlagsOfProjectController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const projectID = Number(req.params.id);
        const result = await getAllFLagsOfProjectService(projectID);
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
    }
}

export const createFlagInProjectController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const projectID = Number(req.params.id);
        console.log(req.user)
        const userID = req.user.id;
        const { name, description } = req.body;

        const result = await createNewFlagService(name, description, projectID, userID);

        res.status(201).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "error" })
    }
}

export const getRecentActivityController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const projectID = Number(req.params.id);
        const result = await getRecentActivityService(projectID);
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

export const getGuardrailsController = async (req: Request, res: Response, next: NextFunction) => {

    const projectID = Number(req.params.id);
    const result = await getGuardrailsService(projectID);
    res.status(200).json(result);
}


export const createSegmentController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const projectID = Number(req.params.id);
        const {name, description} = req.body;
        const result = await createSegmentService(projectID, name, description);
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

export const getMembersController = async (req: Request, res: Response, next: NextFunction) => {

    const projectID = Number(req.params.id);
    const result = await getProjectMembers(projectID);
    res.status(200).json(result);

}

export const getInvitationsOfProjectController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const projectID = Number(req.params.id);
        const result = await getInvitationsOfProjectService(projectID);

        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        next(err);
    }

}

export const inviteUserController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const projectID = Number(req.params.id);
        const invitedByID = req.user.id;
        const { invitee } = req.body;

        console.log("invite::::", projectID, invitedByID, invitee);
        const result = await inviteUserService(projectID, invitedByID, invitee);
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        next(err);
    }

}

