import express from "express";
import { createGuardrailController, updateGuardrailController } from "../controllers/guardrails.controller";

const router = express.Router();


// Create new Guardrail

router.post("/", createGuardrailController);

// Update a Guardrail

router.put("/:id", updateGuardrailController);

// Delete a Guardrail

router.delete("/:id", () => {});

export {router as guardrailRouter}