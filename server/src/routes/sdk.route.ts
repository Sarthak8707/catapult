import express from "express";
import { getSDKFlagsController } from "../controllers/sdk.controller";

const router = express.Router();

router.get("/projects/:id", getSDKFlagsController);

export {router as sdkRouter}