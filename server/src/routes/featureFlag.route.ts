import express from "express";
import { changeFlag, createNewFlag, deleteFlag, getAllFlags } from "../controllers/featureFlag.controller";

const router = express.Router();


// Get all flags 

router.get("/:id", () => getAllFlags)

// Create a flag

router.post("/", () => createNewFlag)

// Update a flag

router.put("/:id", () => changeFlag)

// Delete a flag

router.delete("/:id", () => deleteFlag)


export {router as flagRouter} ;