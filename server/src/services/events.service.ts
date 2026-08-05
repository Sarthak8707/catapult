import { and, eq } from "drizzle-orm";
import { db } from "../db/client"
import { automationActions, events } from "../db/schema"

export const reportEventsService = async (key: string, flagEnvironmentID: number, eventType: string, service: string) => {

    // write every event to DB

    const data = await db.insert(events).values({key, flagEnvironmentID, eventType, service});

    // automate action


}

export const automateActions = async (flagEnvironmentID: number, service: string,) => {

    // check for threshold

    const totalEvents = await db.select().from(events).where(and(
        eq(events.flagEnvironmentID, flagEnvironmentID),
        eq(events.service, service)
    ))

    let failed = 0;

    for(const event of totalEvents){
        if(event.eventType == "failed") failed++;
    }

    let per = 0;

    if(totalEvents.length != 0) { per = (failed*100)/(totalEvents.length); }  

    const data = await db.select().from(automationActions).where(and(
        eq(automationActions.flagEnvironmentID, flagEnvironmentID),
        eq(automationActions.service, service)
    ));

    const threshold = data[0].errorThreshold;

    if(per >= threshold) {

        // perform action

    }


}
