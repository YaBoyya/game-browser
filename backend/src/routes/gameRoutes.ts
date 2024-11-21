import express from "express";
import {
    createGame,
    deleteGameById,
    getAllGames,
    getFilteredGames,
    getGameById,
    updateGame
} from "../controllers/gameController";
import {checkAdminRole} from "../middleware/authMiddleware";

const gameRoutes = express.Router();

gameRoutes.post("/", checkAdminRole, createGame);
gameRoutes.get("/", getAllGames);
gameRoutes.delete("/", checkAdminRole, deleteGameById);
gameRoutes.put("/", checkAdminRole, updateGame);
gameRoutes.get("/filter", getFilteredGames);
gameRoutes.get("/:gameId", getGameById);

export default gameRoutes;
