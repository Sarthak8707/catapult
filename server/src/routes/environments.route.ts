import express from "express";
import { getAllFlagsOfEnvironmentController } from "../controllers/environments.controller";

const router = express.Router();


// Get info about a specific environment

router.get("/:id", () => {});

// Update an environment 

router.put("/:id", () => {});

// Delete an environment

router.delete("/:id", () => {});

// Get all flags in an environment

router.get("/:id/flags", getAllFlagsOfEnvironmentController);


export { router as environmentsRouter }