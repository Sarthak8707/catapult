import { Context, Flag } from "../types";
import { evaluateRollout } from "./rollout";

export function evaluateFlag(flagKey: string, flag: Flag, context: Context) {

  if (!flag.enabled) return false;

  return evaluateRollout(flagKey, flag, context);
  
}