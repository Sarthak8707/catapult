import { Context } from "../types/flag.types";
import { evaluateRollout } from "./rollout";


export const evaluateFlag = (flagName: string, enabled: boolean, rolloutPercentage: number, userID: number) => {
    if(!enabled) return false;

    return evaluateRollout(flagName, rolloutPercentage, userID);
}