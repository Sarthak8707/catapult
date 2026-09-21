import { eq } from "drizzle-orm"
import { db } from "../db/client"
import { projects, users } from "../db/schema"
import { LoginInput, RegisterInput } from "../types/auth.types"
import { AppError } from "../utils/appError"
import { comparePassword, hashPassword } from "../utils/password"
import { signToken } from "../utils/jwt"
import { email } from "zod"

export const loginService = async ({ username, password }: LoginInput) => {

    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    if (!user) {
        throw new AppError("Username or Passwords is incorrect", 401);
    }

    const isTrue = await comparePassword(password, user.password);

    if (!isTrue) {
        throw new AppError("Username or Password is incorrect", 401);
    }

    const [project] = await db.select({ id: projects.id }).from(projects).where(eq(projects.createdBy, user.id))

    const token = signToken({ username: user.username, id: user.id });

    if (project) return { token, username, password: user.password, projectID: project.id };
    
    return { token, username, password: user.password }


}


export const registerService = async ({ username, password, email }: RegisterInput) => {

    const user = await db.select().from(users).where(eq(users.username, username));
    const eml = await db.select().from(users).where(eq(users.email, email));

    if (user.length) {
        throw new AppError("User already exists", 409);
    }
    if (eml.length) {
        throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await hashPassword(password);

    await db.insert(users).values({ username, password: hashedPassword, email });

    return { username, email };


}