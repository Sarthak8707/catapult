import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { flags } from "../db/schema";
import { evaluateFlag } from "../evaluator/flagEvaluator";


// Get all flags

export const getAllFlagsService = async () => {
    const environmentID = 1;
    const data = await db.select().from(flags).where(eq(flags.environmentID, environmentID))
    return {data} ;
}

// Create a new flag

export const createNewFlagService = async (name: string, enabled: boolean, environmentID: number, rolloutPercentage: number) => {
    const flag = {};
    const data = await db.insert(flags).values({name: "abc", enabled: true, environmentID: 1, rolloutPercentage: rolloutPercentage});
    return data;
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

// Evaluate a flag against a context

export const evaluateFlagService = async (userID: number, flagID: number) => {
    
    const flag = (await db.select().from(flags).where(eq(flags.id, flagID)).limit(1))[0];
    const flagName = flag.name;
    const enabled = flag.enabled;
    const rolloutPercentage = flag.rolloutPercentage;
    
    return evaluateFlag(flagName, enabled, rolloutPercentage, userID);
}