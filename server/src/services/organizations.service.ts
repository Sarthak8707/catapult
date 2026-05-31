import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { members } from "../db/schema";
import { GetOrganizationsInput } from "../types/organizations.types";

export const getAllOrganizationsService = async ({userID}: GetOrganizationsInput) => {
    
    const data = await db.select({organizationID: members.organizationID,
         role: members.role, 
        joinedAt: members.joinedAt
    })
    .from(members).where(eq(members.userID, userID));

    return {organizations: data};
}