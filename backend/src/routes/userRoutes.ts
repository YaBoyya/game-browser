import express from "express";
import {
    addGameToUserList,
    createUser,
    deleteAllUsers,
    deleteUserById, deleteUserOwnedGame,
    getAllUsers,
    getUserById,
    getUserByParam, getUserOwnedGames
} from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/", createUser);
userRoutes.get("/", getAllUsers);
userRoutes.delete("/", deleteAllUsers);
userRoutes.get("/:userId", getUserById);
userRoutes.delete("/:userId", deleteUserById);
userRoutes.get("/filter/users", getUserByParam)
userRoutes.post("/games", addGameToUserList);
userRoutes.delete("/games/:userId/:gameId", deleteUserOwnedGame);
userRoutes.get("/games/:userId",getUserOwnedGames)

export default userRoutes;
