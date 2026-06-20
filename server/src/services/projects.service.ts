import { eq } from "drizzle-orm";
import { db } from "../db/client"
import { members, projects } from "../db/schema"
import { GetProjectsInput } from "../types/projects.types";


// Get all projects of an Organization

export const getAllProjectsService = async ({organizationID}: GetProjectsInput) => {

    const projectsList = await db.select().from(projects).where(eq(projects.organizationID, organizationID));

    return {projectsList};

}

// Get all projects of logged in user

export const getAllProjectsOfUserService = async (userID: number) => {

    const projectsList = await db.select({projectName: projects.name})
    .from(projects)
    .innerJoin(projects, eq(members.organizationID, projects.organizationID))
    .where(eq(members.userID, userID));

    return projectsList;

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