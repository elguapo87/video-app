import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";

// Initialize Express
const app = express();
const port = process.env.PORT || 8800;

app.use(cookieParser());

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);

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
    console.log(`Server is running on http://localhost:${port}`);
});

