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

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const user = await UserService.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        await UserService.deleteUserById(userId);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
}

export const getUserByParam = async (req: Request, res: Response) => {
    const username = req.query.username as string;
    const email = req.query.email as string;

    try {
        const users = await UserService.getUserByParam(username, email);
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
}

export const addGameToUserList = async (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    const gameId = req.query.gameId as string;

    try {
        const user = await UserService.addGameToUserList(userId, gameId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
}
