import express from "express";
import {
    addGameToUserList,
    banUserById,
    createUser,
    deleteAllUsers,
    deleteUserById,
    deleteUserOwnedGame,
    getUserById,
    getUserOwnedGames,
    getUsers,
    makeUserAdmin,
    revokeUserAdmin,
    unbanUserById
} from "../controllers/userController";
import {authenticate, checkAdminRole} from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.post("/", checkAdminRole, createUser);
userRoutes.get("/", checkAdminRole, getUsers);
userRoutes.delete("/", checkAdminRole, deleteAllUsers);
userRoutes.get("/:userId", authenticate, getUserById);
userRoutes.delete("/:userId", checkAdminRole, deleteUserById);
userRoutes.post("/:userId/ban", checkAdminRole, banUserById);
userRoutes.post("/:userId/unban", checkAdminRole, unbanUserById);
userRoutes.post("/:userId/makeAdmin", checkAdminRole, makeUserAdmin);
userRoutes.post("/:userId/revokeAdmin", checkAdminRole, revokeUserAdmin);

userRoutes.post("/games/add", authenticate, addGameToUserList);
userRoutes.delete("/games/:gameId", authenticate, deleteUserOwnedGame);
userRoutes.get("/games/get", authenticate, getUserOwnedGames);

export default userRoutes;
