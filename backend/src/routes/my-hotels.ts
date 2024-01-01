import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { check } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
});

// route to create a new hotel
router.post(
    "/",
    verifyToken, 
    [
        check("name", "Hotel name is required").isString(),
        check("city", "City is required").isString(),
        check("country", "Country is required").isString(),
        check("description", "Description is required").isString(),
        check("type", "Type is required").isString(),
        check("adultCount", "Total number of adults are required").isNumeric(),
        check("childCount", "Total number of children are required").isNumeric(),
        check("pricePerNight", "Price per night is required").isNumeric(),
        check("facilities", "Facilities are required").isArray(),
        check("starRating", "Star rating is required").isNumeric(),
    ],
    upload.array("imageFiles", 6), 
    async (req: Request, res: Response) => {
    try {
        // getting the image files
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
        
        // uploading the images to Cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = `data:${image.mimetype};base64,${b64}`;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        // waiting for all the images to be uploaded
        const imageUrls = await Promise.all(uploadPromises);

        // adding the image urls to the new hotel object
        newHotel.imageUrls = imageUrls;

        newHotel.userId = req.userId;
        newHotel.lastUpdated = new Date();

        // Save hotel to database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        // Send hotel in response
        res.status(201).send(hotel);

    } catch (error) {
        console.log("Error in uploading hotels: ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


// route to get all hotels
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
});


export default router;