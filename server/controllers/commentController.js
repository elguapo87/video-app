import commentModel from "../models/commentModel.js";
import videoModel from "../models/videoModel.js";
import { createError } from "../error.js";

export const addComment = async (req, res, next) => {
    const newComment = new commentModel({ ...req.body, userId: req.user.id });

    try {   
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);

    } catch (err) {
        next(err);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await commentModel.findById(req.params.id);
        if (!comment) return next(createError(404, "Comment not found!"));

        const video = await videoModel.findById(comment.videoId);

        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await commentModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment has been deleted.");
        } else {
            next(createError(403, "You can delete only your comment or comments on your video!"));
        }
    } catch (err) {
        next(err);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const comments = await commentModel.find({ videoId: req.params.videoId });
        res.status(200).json(comments);

    } catch (err) {
        next(err);
    }
};


