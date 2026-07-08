import { eq } from "drizzle-orm";
import { db } from "../db/client"
import { environments, members, projects } from "../db/schema"
import { GetProjectsInput } from "../types/projects.types";


// Get all projects of an Organization

export const getAllProjectsService = async ({organizationID}: GetProjectsInput) => {

    try{
        const projectsList = await db.select().from(projects).where(eq(projects.organizationID, organizationID));

        return {projectsList};
    }
    catch(err){
        console.log("service err:::", err);
        
    }

}

// Get all projects of logged in user

export const getAllProjectsOfUserService = async (userID: number) => {

    const projectsList = await db.select({projectName: projects.name})
    .from(projects)
    .innerJoin(projects, eq(members.organizationID, projects.organizationID))
    .where(eq(members.userID, userID));

    return projectsList;

}

// Get info about a specific project


export const getProjectInfoService = async (projectID: number) => {

    const environmentCount = (await db.select().from(environments).where(eq(environments.projectID, projectID))).length;
    const projectData = await db.select().from(projects).where(eq(projects.id, projectID));

    return {environmentCount, projectData};

}

// Create a new project

export const createNewProjectService = async (name: string, organizationID: number, createdBy: number) => {


    const project = await db.transaction(async (tx) => {

    const [data] = await db
    .insert(projects)
    .values({name: name, organizationID: organizationID, createdBy})
    .returning({id: projects.id})
    
    await db.insert(environments).values([
        {
            name: "development", 
            projectID: data.id
        },
        {
            name: "production",
            projectID: data.id
        }
    ]);
    })
   
    return project;
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