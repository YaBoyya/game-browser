import express from "express";
import {createGenre, deleteGenreById, getAllGenres} from "../controllers/genreController";
import {checkAdminRole} from "../middleware/authMiddleware";

const genreRoutes = express.Router();

// @ts-ignore
genreRoutes.post("/", checkAdminRole, createGenre);
genreRoutes.get("/", getAllGenres);
// @ts-ignore
genreRoutes.delete("/:id", checkAdminRole, deleteGenreById);

export default genreRoutes