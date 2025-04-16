import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const commentModel = mongoose.models.comment || mongoose.model("comment", commentSchema);

export default commentModel;