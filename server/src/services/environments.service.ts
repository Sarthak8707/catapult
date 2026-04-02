import { eq } from "drizzle-orm";
import { db } from "../db/client"
import { environments } from "../db/schema"


// Get all environments

export const getAllEnvironmentsService = async (projectID: number) => {
    //const 
    const data = await db.select().from(environments).where(eq(environments.projectID, projectID));
    return data;
}

// Create a new environment

export const createNewEnvironmentService = async (name: string, projectID: number) => {

    const data = await db.insert(environments).values({name: name, projectID: projectID});
    return data;
}

// Update a new environment

export const updateEnvironmentService = async (id: number) => {

    const data = await db.update(environments).set({}).where(eq(environments.id, id));
    return {msg: "Updated Successfully!"};
}

// Delete an environment

export const deleteEnvironmentService = async (id: number) => {

    const data = await db.delete(environments).where(eq(environments.id, id));
    return {msg: "Delted Successfully!"}
}