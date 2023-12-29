import express, { Request, Response } from 'express';
import User from '../models/user';

const router = express.Router();

router.post("/register",async (req: Request, res: Response) => {
    try {
        // Check if user already exists
        let user = await User.findOne({
            email: req.body.email,
        });
        // If user exists, return error stating "User already exists"
        if (user) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        // If user does not exist, create new user
        user = new User(req.body);
        // Save user to database
        await user.save();
    } catch (error) {
        console.log(error);
        // If error, return error
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
});