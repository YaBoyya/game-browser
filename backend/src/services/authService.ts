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
    let role="admin";
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        status: "active",
        role: role,
        created_at: new Date()
    });

    return newUser.save();
};

export const authenticate = async (username: string, password: string): Promise<string | null> => {
    const user = await User.findOne({username});
    if (!user || !(await verifyPassword(password, user.password))) return null;

    if (user.status !== "active") return null;

    return generateToken(user);
};

export const verifyToken = (token: string): {id: string; role: string} | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as {id: string; role: string};
    } catch (error) {
        return null;
    }
};
