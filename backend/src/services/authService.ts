import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User, UserEntity} from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const generateToken = (user: UserEntity): string => {
    return jwt.sign({id: user._id, role: user.role}, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION
    });
};

export const register = async (username: string, email: string, password: string): Promise<UserEntity | null> => {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        status: "active",
        role: "user",
        created_at: new Date()
    });

    return newUser.save();
};

export const authenticate = async (username: string, password: string): Promise<{token: string, role: string} | null> => {
    const user = await User.findOne({username});
    if (!user || !(await verifyPassword(password, user.password))) return null;

    if (user.status !== "active") return null;

    return {token: generateToken(user), role: user.role};
};

export const verifyToken = (token: string): {id: string; role: string} | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as {id: string; role: string};
    } catch (error) {
        return null;
    }
};

export const getUserIdFromToken = (authHeader?: string): string => {
    if (!authHeader) {
        throw new Error("Access denied. No token provided.");
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new Error("Access denied. Invalid token format.");
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {id: string; role: string};
        return decoded.id;
    } catch (error) {
        throw new Error("Access denied. Invalid token.");
    }
};
