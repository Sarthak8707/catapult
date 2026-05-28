import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { users } from "../db/schema"
import { RegisterInput } from "../types/auth.types"
import { AppError } from "../utils/appError"
import { hashPassword } from "../utils/password"

export const loginService = () => {


}


export const registerService = async ({username, password, email}: RegisterInput) => {
    const user = await db.select().from(users).where(eq(users.username, username))

    if(user.length){
        throw new AppError("User already exists", 403);
    }
    const hashedPassword = await hashPassword(password);

    await db.insert(users).values({username, password: hashedPassword, email});

    return { username,  email };

}