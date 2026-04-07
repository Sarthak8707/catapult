import { z } from "zod";

export const createNewEnvironmentSchema = z.object({
    name: z.string(),
    projectID: z.number(),
})


export const updateEnvironmentSchema = createNewEnvironmentSchema.partial();