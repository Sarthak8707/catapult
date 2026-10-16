import express from "express";
import { getInvitationsOfUserController } from "../controllers/me.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllProjectsOfUserController } from "../controllers/projects.controller";

const router = express.Router();


// Get all invitations of user
router.get("/invitations", authMiddleware, getInvitationsOfUserController);

// Get all the projects of the logged in user

router.get("/projects", authMiddleware, getAllProjectsOfUserController);



export {router as meRouter};