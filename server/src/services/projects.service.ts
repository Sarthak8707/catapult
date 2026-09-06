import { eq } from "drizzle-orm";
import { db } from "../db/client"
import { auditLogs, flags, members, projects, users } from "../db/schema"
import { GetProjectsInput } from "../types/projects.types";
import { formatAuditLog } from "../utils/auditLogFormatter";

// Get all projects of logged in user

export const getAllProjectsOfUserService = async (userID: number) => {

    const projectsList = await db.select({projectName: projects.name})
    .from(projects)
    .leftJoin(members, eq(members.projectID, projects.id))
    .where(eq(members.userID, userID));

    return projectsList;

}

// Get info about a specific project


export const getProjectInfoService = async (projectID: number) => {


}

// Create a new project

export const createNewProjectService = async (name: string, createdBy: number) => {

    const [data] = await db
    .insert(projects)
    .values({name: name, createdBy})
    .returning({id: projects.id})
    
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