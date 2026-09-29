import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { guardrails, environmentFlagConfig, flags, guardrailTriggers, guardrailActions } from "../db/schema"


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

// export const getGuardrailsService = async (projectID: number) => {

//     const data = await db.select({
//         name: guardrails.name,
//         description: guardrails.description,
//         service: guardrails.service, 
//         errorThreshold: guardrails.errorThreshold,
//         actionType: guardrails.actionType,
//         action: guardrails.action
//     })
//     .from(flags)
//     .innerJoin(environmentFlagConfig,
//         eq(environmentFlagConfig.flagID, flags.id)
//     )
//     .innerJoin(automationActions, 
//         eq(automationActions.flagEnvironmentID, environmentFlagConfig.id)
//     )
//     .where(eq(flags.projectID, projectID))

//     return data;
    
// }

export const getFlagGuardrailsService = async (flagID: number) => {

    const data = await db.select({
        environmentName: environmentFlagConfig.environment,
        environmentID: environmentFlagConfig.id,

        guardrailName: guardrails.name,
        guardrailStatus: guardrails.status,
        guardrailID: guardrails.id,

        triggerMetric: guardrailTriggers.metric,
        triggerEnabled: guardrailTriggers.enabled,
        triggerThreshold: guardrailTriggers.threshold,
        triggerTimeWindow: guardrailTriggers.timeWindow,

        actionType: guardrailActions.type,
        actionEnabled: guardrailActions.enabled,
        actionConfig: guardrailActions.config
    })
    .from(flags)
    .innerJoin(environmentFlagConfig, 
        eq(environmentFlagConfig.flagID, flags.id)
    )
    .innerJoin(guardrails,
        eq(guardrails.envFlagConfigID, environmentFlagConfig.id)
    )
    .leftJoin(guardrailTriggers,
        eq(guardrailTriggers.guardrailID, guardrails.id)
    )
    .leftJoin(guardrailActions,
        eq(guardrailActions.guardrailID, guardrails.id)
    )
    .where(eq(flags.id, flagID));

    const environments = new Map<number, any>();

     for (const row of data) {
      // Environment
      if (!environments.has(row.environmentID)) {
        environments.set(row.environmentID, {
          environmentID: row.environmentID,
          environmentName: row.environmentName,
          guardrails: new Map<number, any>(),
        });
      }

      const environment = environments.get(row.environmentID);

      // Guardrail
      if (!environment.guardrails.has(row.guardrailID)) {
        environment.guardrails.set(row.guardrailID, {
          guardrailID: row.guardrailID,
          guardrailName: row.guardrailName,
          guardrailStatus: row.guardrailStatus,
          triggers: [],
          actions: [],
        });
      }

      const guardrail = environment.guardrails.get(row.guardrailID);

      // Trigger
      if (row.triggerMetric !== null) {
        const exists = guardrail.triggers.some(
          (trigger: any) => trigger.metric === row.triggerMetric
        );

        if (!exists) {
          guardrail.triggers.push({
            metric: row.triggerMetric,
            enabled: row.triggerEnabled,
            threshold: row.triggerThreshold,
            timeWindow: row.triggerTimeWindow,
          });
        }
      }

      // Action
      if (row.actionType !== null) {
        const exists = guardrail.actions.some(
          (action: any) => action.type === row.actionType
        );

        if (!exists) {
          guardrail.actions.push({
            type: row.actionType,
            enabled: row.actionEnabled,
            config: row.actionConfig,
          });
        }
      }
    }

    return [...environments.values()].map((environment) => ({
        environmentID: environment.environmentID,
        environmentName: environment.environmentName,
        guardrails: [...environment.guardrails.values()]
    }));

}


// export const createGuardrailsService = async (input: GuardrailType) => {
    
//     const data = await db.insert(automationActions).values({
//         name: input.name,
//         description: input.description,
//         flagEnvironmentID: input.flagEnvironmentID,
//         triggerMetric: input.triggerMetric,
//         errorThreshold: input.errorThreshold,
//         action: input.action,
//         actionType: input.actionType
//     })

//     return data;

// }


// export const updateGaurdrailsService = async (input: GuardrailType) => {

//     const data = await db.update(automationActions)
//     .set(input)
//     .where(eq(automationActions.flagEnvironmentID, input.flagEnvironmentID));

//     return data;
    
// }