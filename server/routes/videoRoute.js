import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addVideo } from "../controllers/videoController.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);

export default router;