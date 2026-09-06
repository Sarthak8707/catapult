import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { members, users } from "../db/schema"

export const getProjectMembers = async (projectID: number) => {

    const data = await db.select({username: users.username, role: members.role, joinedAt: members.joinedAt})
    .from(members)
    .innerJoin(users, eq(users.id, members.userID))
    .where(eq(members.projectID, projectID));

    //console.log(data)

    return data;
}