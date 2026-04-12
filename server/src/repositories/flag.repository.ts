import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { flags } from "../db/schema"

export const getFlagsForEnvironment = async (envID: number) => {
    const data = await db.select().from(flags).where(eq(flags.environmentID, envID));
    return data;
}