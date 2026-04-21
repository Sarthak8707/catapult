import { Condition, Context, Rule } from "../../types";

export const matchRule = (rule: Rule, context: Context) => {

    return rule.conditions.every(condition => matchCondition(condition, context))
}


const matchCondition = (condition: Condition, context: Context) => {
    const value = context.attributes[condition.attribute];

    if(condition.operator === "equals"){
        return condition.values.includes(value);
    }

    return false;
}