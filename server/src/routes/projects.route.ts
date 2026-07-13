import express from "express";
import { createFlagInProjectController, getAllEnvironmentsController, getAllFlagsOfProjectController, getAllProjectsOfUserController, getProjectInfoController, getRecentActivityController } from "../controllers/projects.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

// Get all the projects of the logged in user

router.get("/", getAllProjectsOfUserController);

// Get info about a specific project

router.get("/:id", getProjectInfoController);

// Update a project

router.put("/:id", () => {});

// Delete a project

router.delete("/:id", () => {});

// Get all environments in a project

router.get("/:id/environments", getAllEnvironmentsController);

// Get all flags in a project

router.get("/:id/flags", getAllFlagsOfProjectController);

// Create a flag in a project

router.post("/:id/flags", authMiddleware, createFlagInProjectController);

// Get recent activity of a project

router.get("/:id/activity", getRecentActivityController);

export {router as projectsRouter}