import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const image_filename = req.file ? `${req.file.filename}` : null;
    const { name, email, password } = req.body;

    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) return next(createError(409, "User already exists!"));

        if (!validator.isEmail(email)) return next(createError(400, "Please enter a valid email!"));

        if (password.length < 8) return next(createError(400, "Password must have 8 or more characters!"));

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            img: image_filename
        });

        await newUser.save();
        res.status(200).json("User has been created.");
    } catch (err) {
        next(err);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(403, "Wrong credentials!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration

        const { password, ...others } = user._doc;

        res.cookie("access_token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        }).status(200).json(others);
        
    } catch (err) {
        next(err);
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            path: "/"
        });
        res.status(200).json("You are logged out!");
    } catch (err) {
        next(err);
    }
};

export const googleAuth = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/"
            }).status(200).json(user._doc);
        } else {
            const newUser = new userModel({ ...req.body, fromGoogle: true });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                path: "/"
            }).status(200).json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};