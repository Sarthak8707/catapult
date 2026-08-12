import express from "express";
import { changeFlag, createNewFlag, deleteFlagController, getFlagInfoController, getFlagSummaryController } from "../controllers/featureFlag.controller";
import { validate } from "../middlewares/validate.middleware";
import { createNewFlagSchema, updateFlagSchema } from "../schema/flags.schema";

const router = express.Router();


// Get info about a specific flag

router.get("/:id", getFlagInfoController)

// Get flag summary

router.get("/:id/summary", getFlagSummaryController)

// Create a flag

router.post("/", createNewFlag)

// Update a flag

router.put("/:id", changeFlag)

// Delete a flag

router.delete("/:id", deleteFlagController)


export {router as flagRouter} ;