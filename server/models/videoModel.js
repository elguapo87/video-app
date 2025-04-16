import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    userId: {
        type: String,
        requred: true
    },
    title: {
        type: String,
        requred: true
    },
    description: {
        type: String,
        requred: true
    },
    imgUrl: {
        type: String,
        requred: true
    },
    videoUrl: {
        type: String,
        requred: true
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const videoModel = mongoose.models.video || mongoose.model("video", videoSchema);

export default videoModel;