import express, { Request, Response } from "express";
import { createGame, getAllGames, getFilteredGames } from "../controllers/gameController";

const gamesRoutes = express.Router();

gamesRoutes.post("/", createGame);
gamesRoutes.get("/", getAllGames);
// @ts-ignore
gamesRoutes.get("/filter", getFilteredGames);

export default gamesRoutes;