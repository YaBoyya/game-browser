import {Request, Response} from "express";
import UserService from "../services/userService";

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};

export const deleteAllUsers = async (_req: Request, res: Response) => {
    try {
        await UserService.deleteAllUsers();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};
