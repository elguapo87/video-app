import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";

// Initialize Express
const app = express();
const port = process.env.PORT || 8800;

app.use(cookieParser());

// DB Connection
connectDB();

// Routes
app.use("/api/auth", authRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

