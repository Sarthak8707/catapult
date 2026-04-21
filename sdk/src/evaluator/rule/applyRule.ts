import { Context, Flag, Rule } from "../../types";
import { evaluateRollout } from "../rollout/rollout";
import { selectVariant } from "../variant/selectVariant";

export const applyRule = (rule: Rule, flag: Flag, context: Context) => {
    if(rule.rolloutPercentage){
        const flagKey = flag.key;

        // Assuming for every rule there is smae rollout percentage which is flag.rolloutPercentage

        const check = evaluateRollout(flagKey, flag, context);
        if(!check) return null;
    }

    if(rule.variant) return rule.variant;

    const flagKey = flag.key;
    return selectVariant(flagKey, flag, context);

    
}