import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { invitations, projects, users } from "../db/schema"
import { aliasedTable } from "drizzle-orm";

export const getInvitationsOfUserService = async (userID: number) => {

    try {
        const data = await db.select({
            invitedBy: users.username, 
            projectName: projects.name, 
            status: invitations.status
        })
        .from(invitations)
        .leftJoin(users, eq(users.id, invitations.invitedByID))
        .leftJoin(projects, eq(projects.id, invitations.projectID))
        .where(eq(invitations.invitedUserID, userID));
        return data;
    }
    catch (err) {
        console.log(err);
    }

}


const invitedUser = aliasedTable(users, "invitedUser");
const invitedByUser = aliasedTable(users, "invitedByUser");


export const getInvitationsOfProjectService = async (projectID: number) => {

    const data = await db.select({
        invitedBy: invitedByUser.username,
        invitedUser: invitedUser.username,
        status: invitations.status
    })
    .from(invitations)
    .innerJoin(
        invitedUser, eq(invitedUser.id, invitations.invitedUserID)
    )
    .innerJoin(
        invitedByUser, eq(invitedByUser.id, invitations.invitedByID)
    )
    .where(eq(invitations.projectID, projectID));

    return data;

}


export const inviteUserService = async (projectID: number, invitedUserID: number, invitedByID: number) => {

    const data = await db.insert(invitations).values({
        projectID: projectID,
        invitedByID: invitedByID,
        invitedUserID: invitedUserID
    });

    return { msg: "invited!" };

}