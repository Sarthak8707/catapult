import express from "express";
import { getSegmentController, updateSegmentController } from "../controllers/segments.controller";

const router = express.Router();

// Get all segments
router.get("/", () => {});

// Get info about a segment

router.get("/:id", getSegmentController);

// Update a segment

router.put("/:id", updateSegmentController);

router.delete("/", () => {});

export { router as segmentsRouter }