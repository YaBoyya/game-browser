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
import {checkAdminRole} from "../middleware/authMiddleware";

const userRoutes = express.Router();

// @ts-ignore
userRoutes.post("/", checkAdminRole,createUser);
// @ts-ignore
userRoutes.get("/", checkAdminRole, getAllUsers);
// @ts-ignore
userRoutes.delete("/",checkAdminRole, deleteAllUsers);
// @ts-ignore
userRoutes.get("/:userId",checkAdminRole, getUserById);
// @ts-ignore
userRoutes.delete("/:userId", checkAdminRole, deleteUserById);
// @ts-ignore
userRoutes.get("/filter/users", checkAdminRole,getUserByParam)

userRoutes.post("/games/add", addGameToUserList);
userRoutes.delete("/games/:gameId", deleteUserOwnedGame);
userRoutes.get("/games/get",getUserOwnedGames)

export default userRoutes;
