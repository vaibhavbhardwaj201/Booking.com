import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';


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


// Start the Express server
app.listen(4000, () => {
    console.log("Server running on port 4000");
});