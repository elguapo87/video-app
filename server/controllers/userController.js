import userModel from "../models/userModel.js";
import { createError } from "../error.js";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const user = await userModel.findById(req.params.id);

            if (user) {
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