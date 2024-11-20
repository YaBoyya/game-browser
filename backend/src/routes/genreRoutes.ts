import express from "express";
import {createGenre, deleteGenreById, getAllGenres} from "../controllers/genreController";

const genreRoutes = express.Router();

// @ts-ignore
genreRoutes.post("/", createGenre);
genreRoutes.get("/", getAllGenres);
// @ts-ignore
genreRoutes.delete("/:id", deleteGenreById);

export default genreRoutes