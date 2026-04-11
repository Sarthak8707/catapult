import { Context, Flag } from "../types/flag.types";
import { computeBucket } from "./hash";

export const evaluateRollout = (flag: Flag, context: Context) => {
    const { userID } = context;
    
    if(!userID) return false;

    const bucket = computeBucket(flag.name, userID);
    return bucket < flag.rolloutPercentage ;
}