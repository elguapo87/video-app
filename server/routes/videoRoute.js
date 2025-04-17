import express from "express";
import { verifyToken } from "../verifyToken.js";
import { addVideo, addView, deleteVideo, getVideo, getVideosByUser, randomVideos, search, searchByTags, sub, trendVideos, updateVideo } from "../controllers/videoController.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);

router.put("/:id", verifyToken, updateVideo);

router.delete("/:id", verifyToken, deleteVideo);

router.get("/find/:id", getVideo);

router.put("/view/:id", addView);

router.get("/random", randomVideos);

router.get("/trend", trendVideos);

router.get("/sub", verifyToken, sub);

router.get("/search", search);

router.get("/tags", searchByTags);

router.get("/user/:userId", getVideosByUser);

export default router;