import express from "express";
import {createGenre, deleteGenreById, getAllGenres} from "../controllers/genreController";
import {checkAdminRole} from "../middleware/authMiddleware";

const genreRoutes = express.Router();

genreRoutes.post("/", checkAdminRole, createGenre);
genreRoutes.get("/", getAllGenres);
genreRoutes.delete("/:id", checkAdminRole, deleteGenreById);

export default genreRoutes;
