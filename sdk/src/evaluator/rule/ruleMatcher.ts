import { Condition, Context, Rule, Segment } from "../../types";

export const matchRule = (rule: Rule, context: Context) => {

    try {
        let c = rule.conditions.conditions.every(condition => matchCondition(condition, context))

        const ruleSegments = rule.segments;

        if (ruleSegments !== undefined) {

            for (let ruleSegment of ruleSegments) {
                c = c && matchSegment(ruleSegment, context);
            }
        }

        return c;
    }

    catch (err) {
        console.log(err)
    }

}


const matchSegment = (segment: Segment, context: Context): boolean => {

    try {
        return segment.segmentData.conditions.every(condition => matchCondition(condition, context));
    }
    catch (err) {
        console.log(err);
        return false;
    }

}


const matchCondition = (condition: Condition, context: Context) => {

    if (context.attributes[condition.field] == undefined) {
        return false;
    }

    const contextValue = context.attributes[condition.field];
    //console.log("contextVal", contextValue)

    if (condition.operator == "equals") {
        return contextValue == condition.value;
    }

    if (condition.operator == "greater than") {
        return contextValue > condition.value;
    }

    if (condition.operator == "less than") {
        return contextValue < condition.value;
    }

    if (condition.operator == "is one of") {
        return condition.value.includes(contextValue);
    }

    throw new Error("Invalid operator provided");

}