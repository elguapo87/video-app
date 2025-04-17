import videoModel from "../models/videoModel.js";
import userModel from "../models/userModel.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
    const newVideo = new videoModel({ userId: req.user.id, ...req.body });
    
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);

    } catch (err) {
        next(err);
    }
};

export const updateVideo = async (req, res, next) => {
    try {
        const video = await videoModel.findById(req.params.id);
        if(!video) return next(createError(404, "Video not found!"));

        if(req.user.id === video.userId) {
            const updateVideo = await videoModel.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });

            res.status(200).json(updateVideo);

        } else {
            next(createError(403, "You can update only your video"));
        }
        
    } catch (err) {
        next(err);
    }
};

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await videoModel.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));

        if (req.user.id === video.userId) {
            await videoModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Video has been deleted.");

        } else {
            next(createError(403, "You can delete only your video"));
        }
        
    } catch (err) {
        next(err);
    }
};

export const getVideo = async (req, res, next) => {
    try {
        const video = await videoModel.findById(req.params.id);
        res.status(200).json(video);

    } catch (err) {
        next(err);
    }
};

export const addView = async (req, res, next) => {
    try {
        await videoModel.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 } 
        });

        res.status(200).json("The view has been increased.");

    } catch (err) {
        next(err);
    }
};

export const randomVideos = async (req, res, next) => {
    try {
        const videos = await videoModel.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);

    } catch (err) {
        next(err);
    }
};

export const trendVideos = async (req, res, next) => {
    try {
        const videos = await videoModel.find().sort({ views: -1 });
        res.status(200).json(videos);

    } catch (err) {
        next(err);
    }
};

export const sub = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        const subscribedChannels = user.subscribedChannels;

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return videoModel.find({ userId: channelId });
            })
        );
        
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));

    } catch (err) {
        next(err);
    }
};

export const search = async (req, res, next) => {
    try {
        const query = req.query.q;
        const videos = await videoModel.find({ title: { $regex: query, $options: "i" } });
        res.status(200).json(videos);

    } catch (err) {
        next(err);
    }
};

export const searchByTags = async (req, res, next) => {
    const tags = req.query.tags ? req.query.tags.split(",") : [];

    if (tags.length === 0) {
        return res.status(400).json({ message: "Tags query parameter is required" });
    }

    try {
        const videos = await videoModel.find({ tags: { $in: tags } });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const getVideosByUser = async (req, res, next) => {
    try {
        const videos = await videoModel.find({ userId: req.params.userId });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

