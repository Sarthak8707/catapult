import jwt from "jsonwebtoken";
import { inputToken } from "../types/auth.types";
import { env } from "../config/env";


export const signToken =  (userInfo: inputToken) => {

    const signedToken =  jwt.sign(userInfo, env.JWT_SECRET);
    return signedToken;

}