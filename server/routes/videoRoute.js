import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addVideo, randomVideos, search, searchByTags, trendVideos } from "../controllers/videoController.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);

router.get("/search", search);

router.get("/tags", searchByTags);

router.get("/random", randomVideos);

router.get("/trend", trendVideos);

export default router;