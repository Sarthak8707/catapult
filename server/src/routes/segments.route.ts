import express from "express";
import { getSegmentController } from "../controllers/segments.controller";

const router = express.Router();

// Get all segments
router.get("/", () => {});

// Get info about a segment

router.get("/:id", getSegmentController);

router.post("/", () => {});

router.put("/", () => {});

router.delete("/", () => {});

export { router as segmentsRouter }