import express from "express";
import { registerController } from "../controllers/auth.controller";

const router = express.Router();

// Login 

router.post("/login", () => {});

// Register

router.post("/register", registerController);

export {router as authRouter}