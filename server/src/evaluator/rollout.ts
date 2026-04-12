import { Context } from "../types/flag.types";
import { computeBucket } from "./hash";

export const evaluateRollout = (flagName: string, rolloutPercentage: number, userID: number) => {
   
    
    if(!userID) return false;

    const bucket = computeBucket(flagName, userID);
    return bucket < rolloutPercentage;
}