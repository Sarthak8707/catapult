import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { invitations } from "../db/schema"

export const getInvitationsOfUserService = async (userID: number) => {

    try {
        const data = await db.select().from(invitations).where(eq(invitations.invitedUserID, userID));
        return data;
    }
    catch (err) {
        console.log(err);
    }

}


export const getInvitationsOfProjectService = async (projectID: number) => {

    const data = await db.select().from(invitations).where(eq(invitations.projectID, projectID));
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