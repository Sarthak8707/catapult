import { and, eq } from "drizzle-orm";
import { db } from "../db/client";
import { members, organizations, projects, } from "../db/schema";
import { GetOrganizationInfoInput, GetOrganizationsInput } from "../types/organizations.types";




export const getAllOrganizationsService = async ({userID}: GetOrganizationsInput) => {
    
    const data = await db.select({organizationID: members.organizationID,
        organizationName: organizations.name,
         role: members.role, 
        joinedAt: members.joinedAt
    })
    .from(members)
    .innerJoin(organizations, eq(members.organizationID, organizations.id))
    .where(eq(members.userID, userID));

    console.log(data)
   // console.log(userID)

    return {organizations: data};
}


export const getOrganizationInfoService = async ({organizationID, userID}: GetOrganizationInfoInput) => {

    const projectsCount = (await db.select().from(projects).where(eq(projects.organizationID, organizationID))).length;

    const membersCount = (await db.select().from(members).where(eq(members.organizationID, organizationID))).length;

    const createdBy = await db.select({creator: organizations.createdBy}).from(organizations).where(eq(organizations.id, organizationID));

    const yourRole = await db.select({role: members.role}).from(members).where(and(
        eq(members.organizationID, organizationID),
        eq(members.userID, userID)
    ));

    return {projectsCount, membersCount, createdBy, yourRole}

}




