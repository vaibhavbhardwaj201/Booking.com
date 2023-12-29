import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { check, validationResult } from 'express-validator';


const router = express.Router();

router.post("/register", [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    // Check if there are any errors in the request through express-validator
    const errors = validationResult(req);
    // If there are errors, return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array(),
        });
    }
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

        // Create JWT token for user and send it in a cookie to the browser 
        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: "1d"}
        );

        // Send token in a cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.sendStatus(200);

    } catch (error) {
        console.log(error);
        // If error, return error
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
});

export default router;