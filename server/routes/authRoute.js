import express from "express";
import { googleAuth, signIn, signOut, signUp } from "../controllers/authController.js";
import multer from "multer";

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/signup", upload.single("image"), signUp);

router.post("/signin", signIn);

router.get("/signout", signOut);

router.post("/google", googleAuth);

export default router;