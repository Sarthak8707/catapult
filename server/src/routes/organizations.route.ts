import express from "express";

const router = express.Router();

// Get all organizations of the  logged in user

router.get("/", () => {});

// Get info about a specific organization

router.get("/:id", () => {});

// Create an organization of the logged in user

router.post("/", () => {});

// Update an organization

router.put("/:id", () => {});

// Delete an organization

router.delete("/:id", () => {});

// Get all projects of an organization

router.get("/:id/projects", () => {});

// Create a project in an organization

router.post("/:id/projects", () => {});

// Get all members in an organization

router.get("/:id/members", () => {});





export {router as organizationsRouter}