import videoModel from "../models/videoModel.js";

export const addVideo = async (req, res, next) => {
    const newVideo = new videoModel({ userId: req.user.id, ...req.body });
    
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);

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