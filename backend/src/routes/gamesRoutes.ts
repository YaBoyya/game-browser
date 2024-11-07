import express from "express";
import {createGame, getAllGames} from "../controllers/gameController";

const gamesRoutes = express.Router();

gamesRoutes.post("/", createGame);
gamesRoutes.get("/", getAllGames);

export default gamesRoutes;
