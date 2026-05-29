import express from "express";
import { loginController, registerController } from "../controllers/auth.controller";

const router = express.Router();

// Login 

router.post("/login", loginController);

// Register

router.post("/register", registerController);

export {router as authRouter}