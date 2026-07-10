import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { environments, flagRollouts, flagRules, flags, flagVariants, projects } from "../db/schema";
import { getFlagsForEnvironment } from "../repositories/flag.repository";
import { Rule, SDKFlagConfig } from "../types/flag.types";


// Get all flags of Environment

export const getAllFlagsOfEnvironmentService = async (environmentID: number) => {
   
    try{
        const data = await db.select().from(flags).where(eq(flags.environmentID, environmentID))
    return data ;
    }
    catch(err){
        console.log("Service:::::", err);
    }

}

// Get all flags of Project

export const getAllFLagsOfProjectService = async (projectID: number) => {

    try{
        const data = await db.select({

            flagID: flags.id,
            flagName: flags.name,
            enabled: flags.enabled,
            status: flags.status,
            type: flags.type,
            updated: flags.updatedAt,
            

        })
        .from(flags)
        .innerJoin(
            environments,
            eq(flags.environmentID, environments.id)
        )
        .where(eq(environments.projectID, projectID));

        return data;

    }
    catch(err){
        console.log(err);
    }

}

// Get info about specific flag

export const getFlagInfoService = async (flagID: number) => {

    const data = await db.select({ 

        ruleID: flagRules.id,
        ruleName: flagRules.name,
        conditions: flagRules.conditions,

        rolloutID: flagRollouts.id,
        percentage: flagRollouts.percentage,
        bucketBy: flagRollouts.bucketBy,

        variantID: flagVariants.id,
        variantName: flagVariants.name,
        value: flagVariants.value

     })
     .from(flagRules)
     .leftJoin(
        flagRollouts,
        eq(flagRollouts.ruleID, flagRules.id)
     )
     .leftJoin(
        flagVariants,
        eq(flagVariants.id, flagRollouts.variantID)
     )
     .where(eq(flagRules.flagID, flagID))

    // Map of (ruleid, {}) to categorize based on unique rule ids
     
    const groupedByRule = new Map<number, any>();

    for (const row of data){

        if(!groupedByRule.has(row.ruleID)){
            groupedByRule.set(row.ruleID, {
                ruleID: row.ruleID,
                ruleName: row.ruleName,
                conditions: row.conditions,
                rollouts: [],
            })
        }

        groupedByRule.get(row.ruleID).rollouts.push({
            rolloutID: row.rolloutID,
            percentage: row.percentage,
            variantID: row.variantID,
            variantName: row.variantName,
            value: row.value
        })
    }

    const result = [...groupedByRule.values()];

    return result;

}


// Create a new flag

export const createNewFlagService = async (name: string, description: string, projectID: number, userID: number) => {

    const envs = await db.select({id: environments.id}).from(environments).where(eq(environments.projectID, projectID));
    console.log("envs:::::", envs)

    await db.insert(flags).values([
        {
            name, description, createdBy: userID, enabled: false, environmentID: envs[0].id
        },
        {
            name, description, createdBy: userID, enabled: false, environmentID: envs[1].id
        }
    ]);

    return {
        msg: "Created successfully!",
    };

}

// Update a flag

export const changeFlagService = async (flagID: number) => {
    const newData = {};
    const data = await db.update(flags).set(newData).where(eq(flags.id, flagID));
    return {msg: "Updated successfully!"};
}

// Delete a flag

export const deleteFlagService = async (flagID: number) => {
    const data = await db.delete(flags).where(eq(flags.id, flagID));
    return {msg: "Deleted successfully!"}
}

// Config Flag Service

export const getFlagConfig = async (envID: number) => {
    const flags = await getFlagsForEnvironment(envID);
    const config: SDKFlagConfig = {
        flags: {}
    };

    // for(const flag of flags){
    //     config.flags[flag.id] = {
    //         enabled: flag.enabled, 
    //         rolloutPercentage: flag.rolloutPercentage
    //     };
    // }
    return config;
}

// Update rules of flag

export const updateFlagRules = async (flagId: number, rules: Rule[]) => {
   // const data = await db.update(flags).set({rules: rules}).where(eq(flags.id, flagId));
    return {msg: "Updated rules successfully!"}
}

// Create rules for flag

export const createFlagRules = async(flagId: number, rules: Rule[]) => {
   // const flag = await db.select({existingRules: flags.rules}).from(flags).where(eq(flags.id, flagId)).limit(1);

   // const currentRules = flag[0].existingRules || [];
   // const newRules = [...currentRules, ...rules];

    await updateFlagRules(flagId, rules);
    return {msg: "Created rules successfully!"};
}