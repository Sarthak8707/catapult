import express from "express";
import { getAllEnvironmentsController, getAllProjectsOfUserController, getProjectInfoController } from "../controllers/projects.controller";

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

// Create an environment in a project

router.post("/:id/environments", () => {});

// Get all flags in a project

router.get("/:id/flags", () => {});



export {router as projectsRouter}