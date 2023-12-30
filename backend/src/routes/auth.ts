import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import verifyToken from '../middleware/auth';

const router = express.Router();

router.post("/login", [
    // Add express-validator checks here
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    // Check if there are any errors in the request through express-validator
    const errors = validationResult(req);
    // If there are errors, return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array(),
        });
    }
    // If there are no errors, continue
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // If user does not exist, return error stating "Invalid credentials"
        if (!user) {
            return res.status(400).json({message: "Invalid credentials!"});
        }

        // If user exists, check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        // If password is incorrect, return error stating "Invalid credentials"
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials!"});
        }

        // If password is correct, create JWT token for user and send it in a cookie to the browser 
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

        // Return status 200
        return res.status(200).json({userId: user.id});

    } catch (error) {
        console.log(error);
        // If error, return error
        res.status(500).json({message: "Something went wrong during login!"});
    }
});

// Route to validate token in cookie to see if we have active session
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    // If token is valid, return status 200
    res.status(200).send({userId: req.userId});
});


// Route to logout user
router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.status(200).send();
});


export default router;