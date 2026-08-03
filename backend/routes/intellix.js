import express from "express";
import { verifyUser } from "../utils/auth.js";
import { handleIntellixStream } from "../controllers/intellixController.js";

const router = express.Router();

// The unified endpoint for intent-based routing
router.post("/stream", verifyUser, handleIntellixStream);

export default router;
