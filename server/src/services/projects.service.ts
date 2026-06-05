import { eq } from "drizzle-orm";
import { db } from "../db/client"
import { projects } from "../db/schema"
import { GetProjectsInput } from "../types/projects.types";


// Get all projects

export const getAllProjectsService = async ({organizationID}: GetProjectsInput) => {

    const projectsList = await db.select().from(projects).where(eq(projects.organizationID, organizationID));

    return {projectsList};

}

// Create a new projects

export const createNewProjectService = async (name: string, organizationID: number) => {

    const data = await db.insert(projects).values({name: name, organizationID: organizationID});
    return data;
}

// Update a project

export const updateProjectService = async (id: number) => {

    const data = await db.update(projects).set({}).where(eq(projects.id, id));
    return {msg: "Updated Successfully!"};
}

// Delete a project

export const deleteProjectService = async (id: number) => {

    const data = await db.delete(projects).where(eq(projects.id, id));
    return {msg: "Delted Successfully!"}
}