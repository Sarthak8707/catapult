import { db } from "../db/client"
import { events } from "../db/schema"

export const reportEventsService = async (key: string, flagEnvironmentID: number, eventType: string, service: string) => {

    // write every event to DB

    const data = await db.insert(events).values({key, flagEnvironmentID, eventType, service});

    // evaluate rules

    // perform action


}