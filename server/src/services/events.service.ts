import { and, eq } from "drizzle-orm";
import { db } from "../db/client"
import {  environmentFlagConfig, events, guardrailActions, guardrails, guardrailTriggers } from "../db/schema"

export const reportEventsService = async (key: string, flagEnvironmentID: number, eventType: string, service: string) => {

    // write every event to DB

    const data = await db.insert(events).values({key, flagEnvironmentID, eventType, service});

    // automate action 



}
// to check against a given metric and trigger action

export const automateActions = async (flagEnvironmentID: number, guardrailName: string, metric: string,) => {

    // check for threshold

    const totalEvents = await db.select().from(events).where(and(
        eq(events.flagEnvironmentID, flagEnvironmentID),
        eq(events.metric, metric)
    ))

    let failed = 0;

    for(const event of totalEvents){
        if(event.value == "failed") failed++;
    }

    let per = 0;

    if(totalEvents.length != 0) { per = (failed*100)/(totalEvents.length); }  

    const [g] = await db.select().from(guardrails).where(and(
        eq(guardrails.envFlagConfigID, flagEnvironmentID),
        eq(guardrails.name, guardrailName)
    ))

    const data = await db.select().from(guardrailTriggers).where(and(
        eq(guardrailTriggers.guardrailID, g.id),
        eq(guardrailTriggers.metric, metric)
    ));

    const threshold = data[0].threshold;

    if(per >= threshold) {

        // perform actions 
        const actions = await db.select().from(guardrailActions).where(and(
            eq(guardrailActions.guardrailID, g.id)
        ))

        for(const action of actions){
            performAction(action.guardrailID, action.type);
        }
    }
}

const performAction = async (guardrailID: number, action: string) => {

    const [fc] = await db.select().from(guardrails).where(eq(guardrails.id, guardrailID));

    if(action === "kill switch"){
        await db.update(environmentFlagConfig).set({enabled: false}).where(eq(environmentFlagConfig.id, fc.envFlagConfigID));
    }

}
