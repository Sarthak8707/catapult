import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { flags } from "../db/schema";
import { getFlagsForEnvironment } from "../repositories/flag.repository";
import { SDKFlagConfig } from "../types/flag.types";


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

// Config Flag Service

export const getFlagConfig = async (envID: number) => {
    const flags = await getFlagsForEnvironment(envID);
    const config: SDKFlagConfig = {
        flags: {}
    };

    for(const flag of flags){
        config.flags[flag.id] = {
            enabled: flag.enabled, 
            rolloutPercentage: flag.rolloutPercentage
        };
    }
    return config;
}