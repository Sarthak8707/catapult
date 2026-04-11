import { Context, Flag } from "../types/flag.types";
import { evaluateRollout } from "./rollout";


export const evaluateFlag = (flag: Flag, context: Context) => {
    if(!flag.enabled) return false;

    return evaluateRollout(flag, context);
}