import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import myHotelsRoutes from './routes/my-hotels';


// Connect to Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// Create Express server
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// serving static frontend files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes below

// To register a user
app.use("/api/users", userRoutes);
// To login a user
app.use("/api/auth", authRoutes)
// To add a hotel
app.use("/api/my-hotels", myHotelsRoutes);

// Pass all other requests to frontend that are not api routes
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});


// Start the Express server
app.listen(4000, () => {
    console.log("Server running on port 4000");
});