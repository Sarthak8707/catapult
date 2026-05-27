import express from "express";

const router = express.Router();

// Get info about a specific project

router.get("/:id", () => {});

// Update a project

router.put("/:id", () => {});

// Delete a project

router.delete("/:id", () => {});

// Get all environments in a project

router.get("/:id/environments", () => {});

// Create an environment in a project

router.post("/:id/environments", () => {});

export {router as projectsRouter}