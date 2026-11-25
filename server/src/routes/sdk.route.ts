import express from "express";
import { getSDKFlagsController } from "../controllers/sdk.controller";
import { validateSDKKey } from "../middlewares/sdk.middleware";

const router = express.Router();

router.get("/projects/:id", validateSDKKey, getSDKFlagsController);

export {router as sdkRouter}