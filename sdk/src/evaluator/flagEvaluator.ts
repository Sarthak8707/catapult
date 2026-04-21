import { Context, Flag } from "../types";
import { evaluateRollout } from "./rollout/rollout";
import { applyRule } from "./rule/applyRule";
import { matchRule } from "./rule/ruleMatcher";
import { selectVariant } from "./variant/selectVariant";

export function evaluateFlag(flagKey: string, flag: Flag, context: Context) {

  if (!flag.enabled) return {enabled: false};


  // Check against rules 

  for(const rule of flag.rules || []){
    if(matchRule(rule, context)){

      // Rule matched
      return applyRule(rule, flag, context);
    }
  }

     // Rule didn't match

     
  // Apply default behaviour


  // Assuming that default behaviour is rollout with flag.rolloutPercentage
  // and variant with one of flag.variants

  const passes = evaluateRollout(flagKey, flag, context);

  if(!passes) return {enabled: false};
  
  if(flag.variants?.length){
    const variant = selectVariant(flagKey, flag, context);
    return {enabled: true, variant}
  }

  return {enabled: true};

}