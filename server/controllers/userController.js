import userModel from "../models/userModel.js";
import videoModel from "../models/videoModel.js";;
import { createError } from "../error.js";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const user = await userModel.findById(req.params.id);

            if (user) {
                // If a new image is uploaded, delete the old one and add the new one
                if (req.file) {
                    // Delete the old image if it exists
                    if (user.img) {
                        const oldImagePath = path.join("uploads", user.img);
                        fs.unlink(oldImagePath, (err) => {
                            if (err) {
                                console.error(`Failed to delete old image: ${oldImagePath}`, err);
                            }
                        });
                    }

                    // Add new image
                    const newImage = req.file.filename;
                    req.body.img = newImage; // Include the new image in the update
                }

                // Password validation: check if the password exists and is less than 8 characters
                if (req.body.password && req.body.password.length < 8) {
                    return next(createError(400, "Password must have 8 or more characters!"));
                }

                // Hash the password if it's being updated
                if (req.body.password) {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                }

                const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });

                res.status(200).json(updatedUser);

            } else {
                next(createError(404, "User not found!"));
            }


        } catch (err) {
            next(err);
        }

    } else {
        next(createError(403, "You can update only your account!"));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user._doc);

    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const user = await userModel.findById(req.params.id);

            if (user) {   
                if (user.img) {
                    const oldImagePath = path.join("uploads", user.img);
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error(`Failed to delete old image: ${oldImagePath}`, err);
                        }
                    });
                }
                
                await userModel.findByIdAndDelete(req.params.id);

                res.status(200).json("User has been deleted.");

            } else {
                next(createError(404, "User not found!"));
            }

        } catch (err) {
            next(err);
        }

    } else {
        next(createError(403, "You can delete only your account!"))
    }
};

export const subscribe = async (req, res, next) => {
    try {
        await userModel.findByIdAndUpdate(req.user.id, {
            $push: { subscribedChannels: req.params.id }
        });
        await userModel.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });

        res.status(200).json("Subscription successfull.");

    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        await userModel.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedChannels: req.params.id }
        });
        await userModel.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });

        res.status(200).json("Unsubscription successfull.");

    } catch (err) {
        next(err);
    }
};


export const likeVideo = async (req, res, next) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    try {
        await videoModel.findByIdAndUpdate(videoId, {
            $addToSet: { likes: userId },
            $pull: { dislikes: userId }
        });

        res.status(200).json("The video has been liked.");

    } catch (err) {
        next(err);
    }
};

export const dislikeVideo = async (req, res, next) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;

    try {
        await videoModel.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: userId },
            $pull: { likes: userId }
        });

        res.status(200).json("The video has been disliked.");

    } catch (err) {
        next(err);
    }
};

export const saveVideo = async (req, res, next) => {
    const videoId = req.params.videoId;
    const userId = req.user.id;

    try {
        // Find if the video is already saved by the user
        const user = await userModel.findById(userId);

        if (user.savedVideos.includes(videoId)) {
            // If the video is already saved, remove it
            await userModel.findByIdAndUpdate(userId, {
                $pull: { savedVideos: videoId }
            });

            res.status(200).json({ message: "Video removed from saved list" });

        } else {
            // If the video is not saved, add it
            await userModel.findByIdAndUpdate(userId, {
                $push: { savedVideos: videoId }
            });

            res.status(200).json({ message: "Video saved" });
        }

    } catch (err) {
        next(err);
    }
};

export const getSavedVideos = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        const savedList = user.savedVideos;

        const videos = await videoModel.find({ _id: { $in: savedList } });
        res.status(200).json(videos);

    } catch (err) {
        next(err);
    }
};

