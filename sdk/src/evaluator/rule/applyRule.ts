import { Context, Flag, Rule } from "../../types";
import { evaluateRollout } from "../rollout/rollout";
import { selectVariant } from "../variant/selectVariant";

export const applyRule = (rule: Rule, flag: Flag, context: Context) => {
    if(rule.rolloutPercentage){
        const flagKey = flag.key;

        // Assuming for every rule there is same rollout percentage which is flag.rolloutPercentage

        const check = evaluateRollout(flagKey, flag, context);
        if(!check) return {enabled: false};
    }

    // If variant is already present in rule
    if(rule.variant) return rule.variant;

    // If variant is not present
    const flagKey = flag.key;
    return selectVariant(flagKey, flag, context);


}