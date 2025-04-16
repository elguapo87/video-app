import express from "express";

// Initialize Express
const app = express();
const port = process.env.PORT || 8800;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

