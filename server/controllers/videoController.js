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