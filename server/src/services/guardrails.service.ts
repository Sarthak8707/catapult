import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { automationActions, environmentFlagConfig, flags } from "../db/schema"

export const getGuardrailsService = async (projectID: number) => {

    const data = await db.select({
        name: automationActions.name,
        description: automationActions.description,
        service: automationActions.service, 
        errorThreshold: automationActions.errorThreshold,
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