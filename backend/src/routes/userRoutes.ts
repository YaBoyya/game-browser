import express from "express";
import {
    createUser,
    deleteAllUsers,
    getAllUsers
} from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/", createUser);
userRoutes.get("/", getAllUsers);
userRoutes.delete("/", deleteAllUsers);

export default userRoutes;
