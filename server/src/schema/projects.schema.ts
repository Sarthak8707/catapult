import { z } from "zod";


export const createNewProjectSchema = z.object({
    name: z.string(),
    organizationID: z.number(),
})

export const updateProjectSchema = createNewProjectSchema.partial();