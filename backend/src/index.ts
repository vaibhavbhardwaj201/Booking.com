import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// Create Express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "Hello World" });
});


// Start the Express server
app.listen(4000, () => {
    console.log("Server running on port 4000");
});