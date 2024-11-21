import express from "express";
import {
    addGameToUserList,
    createUser,
    deleteAllUsers,
    deleteUserById,
    deleteUserOwnedGame,
    getUserById,
    getUsers,
    getUserOwnedGames
} from "../controllers/userController";
import {authenticate, checkAdminRole} from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.post("/", checkAdminRole, createUser);
userRoutes.get("/", checkAdminRole, getUsers);
userRoutes.delete("/", checkAdminRole, deleteAllUsers);
userRoutes.get("/:userId", authenticate, getUserById);
userRoutes.delete("/:userId", checkAdminRole, deleteUserById);

userRoutes.post("/games/add", authenticate, addGameToUserList);
userRoutes.delete("/games/:gameId", authenticate, deleteUserOwnedGame);
userRoutes.get("/games/get", authenticate, getUserOwnedGames);

export default userRoutes;
