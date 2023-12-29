import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// Create Express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes below

// To register a user
app.use("/api/users", userRoutes);
// To login a user
app.use("/api/auth", authRoutes)


// Start the Express server
app.listen(4000, () => {
    console.log("Server running on port 4000");
});