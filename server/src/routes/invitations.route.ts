import express from "express";
import { acceptInviteController, rejectInviteController } from "../controllers/invitations.controller";

const router = express.Router();


// Accept invitation

router.put("/:id/accept", acceptInviteController);

// Reject invitation

router.put("/:id/reject", rejectInviteController);


export {router as invitationRouter}