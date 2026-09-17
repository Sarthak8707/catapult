import express from "express";
import { getInvitationsOfUserController } from "../controllers/me.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();


// Get all invitations of user
router.get("/invitations", authMiddleware, getInvitationsOfUserController);


// Get all projects of user
router.get("/projects", () => {});

export {router as meRouter};