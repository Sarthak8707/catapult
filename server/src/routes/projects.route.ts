import express from "express";
import { createFlagInProjectController, getAllEnvironmentsController, getAllFlagsOfProjectController, getAllProjectsOfUserController, getGuardrailsController, getMembersController, getProjectInfoController, getRecentActivityController } from "../controllers/projects.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllSegmentsController, getSegmentController } from "../controllers/segments.controller";

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

// Get Guardrails of a project

router.get("/:id/guardrails", getGuardrailsController);

// Get Segments of project

router.get("/:id/segments", getAllSegmentsController);

// Get Members of project

router.get("/:id/members", getMembersController);



export {router as projectsRouter}