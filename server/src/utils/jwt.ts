import jwt from "jsonwebtoken";
import { inputToken } from "../types/auth.types";
import { env } from "node:process";

export const signToken = async (userInfo: inputToken) => {
//const signedToken = jwt.sign(userInfo, env.JWT_SECRET);
return {id: 0, username: ""}
}