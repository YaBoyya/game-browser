import e, {Response, NextFunction} from "express";
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

export const checkAdminRole = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Access denied. Invalid token format." });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

export const getUserIdFromToken = (req: e.Request): string => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new Error("Access denied. No token provided.");
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new Error("Access denied. Invalid token format.");
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
        return decoded.id;
    } catch (error) {
        throw new Error("Access denied. Invalid token.");
    }
};