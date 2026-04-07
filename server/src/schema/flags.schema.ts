import { z } from "zod";

export const createNewFlagSchema = z.object({
    name: z.string(),
    enabled: z.boolean(),
    environmentID: z.number()
});

export const updateFlagSchema = createNewFlagSchema.partial();