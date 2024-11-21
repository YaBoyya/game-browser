import express, {Request, Response} from "express";
import {createGame, deleteGameById, getAllGames, getFilteredGames, updateGame} from "../controllers/gameController";
import {createPlatform} from "../controllers/platformController";
import {checkAdminRole} from "../middleware/authMiddleware";

const gamesRoutes = express.Router();

// @ts-ignore
gamesRoutes.post("/", checkAdminRole,  createGame);
gamesRoutes.get("/", getAllGames);
// @ts-ignore
gamesRoutes.delete("/", checkAdminRole, deleteGameById);
// @ts-ignore
gamesRoutes.put("/", checkAdminRole, updateGame);
// @ts-ignore
gamesRoutes.get("/filter", getFilteredGames);

export default gamesRoutes;
