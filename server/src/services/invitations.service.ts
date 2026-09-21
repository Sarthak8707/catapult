import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { invitations, members, projects, users } from "../db/schema"
import { aliasedTable } from "drizzle-orm";

export const getInvitationsOfUserService = async (userID: number) => {

    try {
        const data = await db.select({
            id: invitations.id,
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


export const inviteUserService = async (projectID: number, invitedByID: number, invitee: string) => {

    const [user] = await db.select().from(users).where(eq(users.username, invitee));

    const data = await db.insert(invitations).values({
        projectID: projectID,
        invitedByID: invitedByID,
        invitedUserID: user.id
    });

    return { msg: "invited!" };

}

export const acceptInviteService = async (invitationID: number) => {

    // Update status to accepted

    const [data] = await db.update(invitations)
    .set({status: "accepted"})
    .where(eq(invitations.id, invitationID))
    .returning({
        projectID: invitations.projectID,
        invitedUserID: invitations.invitedUserID,
        invitedByID: invitations.invitedByID,
    })
    
    // Add invited user to members table

    await db.insert(members).values({projectID: data.projectID, userID: data.invitedUserID, role: "member"});

    return {msg: "done"};
}


export const rejectInviteService = async (invitationID: number) => {

    await db.update(invitations).set({status: "rejected"}).where(eq(invitations.id, invitationID));

    return {msg: "done"};
    
}