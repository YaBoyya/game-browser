import {Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/user";
import AuthRequest from "../types/AuthRequest";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({message: "Access denied. No token provided."});
        return;
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as {id: string; role: string};

        const user = await User.findById(decodedToken.id);
        if (!user) {
            res.status(401).json({message: "Access denied. User not found."});
            return;
        }

        if (user.status !== "active") {
            res.status(403).json({message: "Access denied. User is inactive or banned."});
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({message: "Invalid token."});
    }
};
