import express from "express";
import { reportEventsController } from "../controllers/events.controller";

const router = express.Router();


router.post("/", reportEventsController);




export { router as eventsRouter }