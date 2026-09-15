import { Condition, Context, Rule } from "../../types";

export const matchRule = (rule: Rule, context: Context) => {

    try{
        return rule.conditions.conditions.every(condition => matchCondition(condition, context));
    }
    catch(err){
        console.log(err)
    }
    
}


const matchCondition = (condition: Condition, context: Context) => {

    if(context.attributes[condition.field] == undefined) { throw new Error("The specified field does not exist") }

    const contextValue = context.attributes[condition.field];
    console.log("contextVal", contextValue)
    
    if(condition.operator == "equals"){
        return contextValue == condition.value ;
    }

    if(condition.operator == "greater than"){
        return contextValue > condition.value ;
    }

    if(condition.operator == "less than"){
        return contextValue < condition.value ;
    }

    if(condition.operator == "is one of"){
        return condition.value.includes(contextValue);
    }

    return false;
}