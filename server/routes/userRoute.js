import express from "express";
import multer from "multer";
import { verifyToken } from "../verifyToken.js";
import { updateUser } from "../controllers/userController.js";

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

export default router;