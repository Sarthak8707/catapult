import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { segments } from "../db/schema"

export const getAllSegmentsService = async (projectID: number) => {

    try{
        const data = await db.select().from(segments).where(eq(segments.projectID, projectID));
        return data;
    }
    catch(err){
        console.log(err);
    }
    
}

export const getSegmentService = async (id: number) => {

    try{
        const data = await db.select().from(segments).where(eq(segments.id, id));

        return data;
    }
    catch(err){
        console.log(err);
    }
}