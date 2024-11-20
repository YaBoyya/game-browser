import express from "express";
import {
    addGameToUserList,
    createUser,
    deleteAllUsers,
    deleteUserById,
    getAllUsers,
    getUserById,
    getUserByParam
} from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/", createUser);
userRoutes.get("/", getAllUsers);
userRoutes.delete("/", deleteAllUsers);
userRoutes.get("/:userId", getUserById);
userRoutes.delete("/:userId", deleteUserById);
userRoutes.get("/filter/users", getUserByParam)
userRoutes.post("/games", addGameToUserList);

export default userRoutes;
