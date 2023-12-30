import { NextFunction, Request, Response } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Get token from cookie and check if it exists
    const token = req.cookies["auth_token"];
    // If token does not exist, return error stating "Unauthorized"
    if(!token) {
        return res.status(401).json({message: "Unauthorized!"});
    }
    
    try {
        // If token exists, verify it
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        // Add user from payload to request
        req.userId = (decoded as JwtPayload).userId;

        next();

    } catch (error) {
        return res.status(401).json({message: "Unauthorized!"});
    }
}

export default verifyToken;