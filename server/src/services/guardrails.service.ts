import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { automationActions, environmentFlagConfig, flags } from "../db/schema"


type GuardrailType = {
    name: string,
    description?: string,
    flagEnvironmentID: number,
    service?: string,
    triggerMetric: string[],
    errorThreshold: number,
    actionType: string,
    action: string

}

export const getGuardrailsService = async (projectID: number) => {

    const data = await db.select({
        name: automationActions.name,
        description: automationActions.description,
        service: automationActions.service, 
        errorThreshold: automationActions.errorThreshold,
        actionType: automationActions.actionType,
        action: automationActions.action
    })
    .from(flags)
    .innerJoin(environmentFlagConfig,
        eq(environmentFlagConfig.flagID, flags.id)
    )
    .innerJoin(automationActions, 
        eq(automationActions.flagEnvironmentID, environmentFlagConfig.id)
    )
    .where(eq(flags.projectID, projectID))

    return data;
    
}


export const createGuardrailsService = async (input: GuardrailType) => {
    
    const data = await db.insert(automationActions).values({
        name: input.name,
        description: input.description,
        flagEnvironmentID: input.flagEnvironmentID,
        triggerMetric: input.triggerMetric,
        errorThreshold: input.errorThreshold,
        action: input.action,
        actionType: input.actionType
    })

    return data;

}


export const updateGaurdrailsService = async (input: GuardrailType) => {

    const data = await db.update(automationActions)
    .set(input)
    .where(eq(automationActions.flagEnvironmentID, input.flagEnvironmentID));

    return data;
    
}