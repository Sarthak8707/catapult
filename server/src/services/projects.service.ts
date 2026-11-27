import { eq } from "drizzle-orm";
import { db } from "../db/client"
import { auditLogs, flags, members, projects, sdkKeys, users } from "../db/schema"
import { GetProjectsInput } from "../types/projects.types";
import { formatAuditLog } from "../utils/auditLogFormatter";
import { generateSDKKey } from "../utils/sdkKey";

// Get all projects of logged in user

export const getAllProjectsOfUserService = async (userID: number) => {

    const projectsList = await db.select({name: projects.name, id: projects.id})
    .from(members)
    .leftJoin(projects, eq(projects.id, members.projectID))
    .where(eq(members.userID, userID));

    return projectsList;

}

// Get info about a specific project


export const getProjectInfoService = async (projectID: number) => {


}

// Create a new project

export const createNewProjectService = async (name: string, createdBy: number) => {

    // Create a project
    console.log("name", name, "creted by-", createdBy);

    const [projectCreated] = await db
    .insert(projects)
    .values({name: name, createdBy})
    .returning({id: projects.id})

    // Add creator to member of table

    await db.insert(members).values({projectID: projectCreated.id, userID: createdBy, role: "admin"});
    
    // Generate a sdk key and save it to db

    const sdkKeyDev = generateSDKKey();
    const sdkKeyStag = generateSDKKey();

    await db.insert(sdkKeys).values([
        { projectID: projectCreated.id, environment: "dev", value: sdkKeyDev },
        { projectID: projectCreated.id, environment: "stag", value: sdkKeyStag }
    ]);

    return projectCreated;
    
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


// Get recent activity of a project

export const getRecentActivityService = async (projectID: number) => {

    const logs = await db.select({
        actorName: users.username,
        resourceName: auditLogs.resourceName,
        action: auditLogs.action,
        resourceType: auditLogs.resourceType
    })
    .from(auditLogs)
    .leftJoin(users, eq(users.id, auditLogs.actorUserID))
    .where(eq(auditLogs.projectID, projectID));

    return logs.map(log => ({
    ...log,
    message: formatAuditLog(log)
}));


}