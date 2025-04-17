import express from "express";
import multer from "multer";
import { verifyToken } from "../verifyToken.js";
import { deleteUser, dislikeVideo, getSavedVideos, getUser, likeVideo, saveVideo, subscribe, unsubscribe, updateUser } from "../controllers/userController.js";

// Multer config
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.put("/:id", verifyToken, upload.single("image"), updateUser);

router.delete("/:id", verifyToken, deleteUser);

router.get("/find/:id", getUser);

router.put("/sub/:id", verifyToken, subscribe);

router.put("/unsub/:id", verifyToken, unsubscribe);

router.put("/like/:videoId", verifyToken, likeVideo);

router.put("/dislike/:videoId", verifyToken, dislikeVideo);

router.put("/saveVideo/:videoId", verifyToken, saveVideo);

router.get("/savedVideos", verifyToken, getSavedVideos);

export default router;