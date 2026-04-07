import express from "express";
import { changeFlag, createNewFlag, deleteFlag, getAllFlags } from "../controllers/featureFlag.controller";
import { validate } from "../middlewares/validate.middleware";
import { createNewFlagSchema, updateFlagSchema } from "../schema/flags.schema";

const router = express.Router();


// Get all flags 

router.get("/:id",    getAllFlags)

// Create a flag

router.post("/", validate(createNewFlagSchema), createNewFlag)

// Update a flag

router.put("/:id", validate(updateFlagSchema), changeFlag)

// Delete a flag

router.delete("/:id", () => deleteFlag)


export {router as flagRouter} ;