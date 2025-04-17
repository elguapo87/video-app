import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import videoRoute from "./routes/videoRoute.js";
import commentRoute from "./routes/commentRoute.js";

dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 8800;

app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));

//   app.use(cors({
//     origin: 'https://video-app-client-hk9e.onrender.com', 
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
//     methods: ["GET", "POST", "PUT", "DELETE"]
// }));

app.use("/images", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);

// DB Connection
connectDB();

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
        return res.status(status).json({
            success: false,
            status, 
            message
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});