import express from "express";
import { createProjectController, getAllOrganizationsController, getAllProjectsController, getOrganizationInfoController } from "../controllers/organizations.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

// Get all organizations of the  logged in user

router.get("/", authMiddleware, getAllOrganizationsController);

// Get info about a specific organization

router.get("/:id", authMiddleware, getOrganizationInfoController);

// Create an organization of the logged in user

router.post("/", () => {});

// Update an organization

router.put("/:id", () => {});

// Delete an organization

router.delete("/:id", () => {});

// Get all projects of an organization

router.get("/:id/projects", getAllProjectsController);

// Create a project in an organization

router.post("/:id/projects", authMiddleware, createProjectController);

// Get all members in an organization

router.get("/:id/members", () => {});





export {router as organizationsRouter}