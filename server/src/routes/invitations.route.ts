import express from "express";
import { acceptInviteController, rejectInviteController } from "../controllers/invitations.controller";

const router = express.Router();


// Accept invitation

router.put("/:id", acceptInviteController);

// Reject invitation

router.put("/:id", rejectInviteController);


export {router as invitationRouter}