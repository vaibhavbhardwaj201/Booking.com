import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
});


router.post("/", upload.array("imageFiles", 6), (req: Request, res: Response) => {
    try {
        // getting the image files
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel = req.body;
        
        // uploading the images to Cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = `data:${image.mimetype};base64,${b64}`;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        // waiting for all the images to be uploaded
        const imageUrls = Promise.all(uploadPromises);

        // adding the image urls to the new hotel object
        // TODO: 

    } catch (error) {
        console.log("Error in uploading hotels: ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
})