import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const username = req.body.username;
        const password = req.body.password;

        const result = await loginService({username, password});
        const token = result.token; 
        const projectID = result.projectID;

        return res.status(200).json({"token": token, "username": username, password: result.password, projectID});
    }
    catch(err){
        next(err);
    }

    
}

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try{
         const { username, password, email } = req.body;
         const result = await registerService({username, password, email});

         return res.status(201).json(result);
    }
    catch(err){
        next(err);
    }
}