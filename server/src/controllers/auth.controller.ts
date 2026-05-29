import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;

    const token = await loginService({username, password});
    //const  = 

    return res.status(200).json({"token": token})

    
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