import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { members, organizations } from "../db/schema";
import { GetOrganizationsInput } from "../types/organizations.types";

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