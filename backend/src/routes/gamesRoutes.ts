import express, {Request, Response} from "express";
import {createGame, deleteGameById, getAllGames, getFilteredGames, updateGame} from "../controllers/gameController";
import {createPlatform} from "../controllers/platformController";

const gamesRoutes = express.Router();

gamesRoutes.post("/", createGame);
gamesRoutes.get("/", getAllGames);
// @ts-ignore
gamesRoutes.delete("/", deleteGameById);
// @ts-ignore
gamesRoutes.put("/", updateGame);
// @ts-ignore
gamesRoutes.get("/filter", getFilteredGames);

export default gamesRoutes;
