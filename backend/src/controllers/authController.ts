import {Request, Response} from "express";
import {authenticate, register} from "../services/authService";
import {User} from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({$or: [{username}, {email}]});
        if (existingUser) {
            let error = new Error("Email or username already taken");
            error.name = "taken";
            throw error;
        }

        const newUser = await register(username, email, password);

        if (newUser) {
            res.status(201).json({message: "User registered successfully"});
        }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            if (error.name == "taken") {
                res.status(400).json({message: error.message});
            } else {
                res.status(500).json({message: "Server error: " + error.message});
            }
        } else {
            res.status(500).json({message: "Server error"});
        }
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const token = await authenticate(username, password);

    if (token) {
        res.json({token});
    } else {
        res.status(401).json({message: "Invalid credentials or inactive user"});
    }
};
