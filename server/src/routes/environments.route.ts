import express from "express";

const router = express.Router();


// Get info about a specific environment

router.get("/:id", () => {});

// Update an environment 

router.put("/:id", () => {});

// Delete an environment

router.delete("/:id", () => {});

// Get all flags in an environment

router.get("/:id/flags", () => {});

// Create a flag in an environment

router.post("/:id/flags", () => {});

export { router as environmentsRouter }