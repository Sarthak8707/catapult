import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const username = req.body.username;
        const password = req.body.password;

        const result = await loginService({username, password});
        const token = result.token; 

        return res.status(200).json({"token": token, "username": username});
    }
    catch(err){
        next(err);
    }

    
}

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try{
         const { username, password, email } = req.body;
         const result = await registerService({username, password, email});

         return res.status(201).json({msg: "User successfully created!"});
    }
    catch(err){
        next(err);
    }
}