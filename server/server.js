import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";

// Initialize Express
const app = express();
const port = process.env.PORT || 8800;

// DB Connection
connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

