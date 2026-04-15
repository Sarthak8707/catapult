import { Context, Flag } from "../types";
import { evaluateRollout } from "./rollout/rollout";
import { selectVariant } from "./variant/selectVariant";

export function evaluateFlag(flagKey: string, flag: Flag, context: Context) {

  if (!flag.enabled) return {enabled: false};

  const passes = evaluateRollout(flagKey, flag, context);

  if(!passes) return {enabled: false};
  
  if(flag.variants?.length){
    const variant = selectVariant(flagKey, flag, context);
    return {enabled: true, variant}
  }

  return {enabled: true};

}