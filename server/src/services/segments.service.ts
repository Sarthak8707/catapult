import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { segments } from "../db/schema"

export const getAllSegmentsService = async (projectID: number) => {

    try {
        const data = await db.select().from(segments).where(eq(segments.projectID, projectID));
        return data;
    }
    catch (err) {
        console.log(err);
    }

}

export const getSegmentService = async (id: number) => {

    try {
        const [data] = await db.select().from(segments).where(eq(segments.id, id));

        return data;
    }
    catch (err) {
        console.log(err);
    }
}

export const createSegmentService = async (projectID: number, name: string, description: string) => {

    const [data] = await db.insert(segments).values({ projectID, name, description }).returning({ id: segments.id });
    return data;
}


export const updateSegmentService = async (segmentID: number, conditions: any) => {

    console.log("check", segmentID, conditions)
    const data = await db.update(segments).set({
        conditions: {
            "operator": "AND",
            "conditions": conditions
        }
    }).where(eq(segments.id, segmentID));

    return {msg: "Updated!"} ;

}