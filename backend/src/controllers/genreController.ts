import { Request, Response } from "express";
import GenreService from "../services/genreService";

export const createGenre = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const existingGenre = await GenreService.getGenreByName(name);
        if (existingGenre) {
            return res.status(400).json({ message: "Genre with the same name already exists" });
        }

        const newGenre = {
            name: name,
        };

        const createdGenre = await GenreService.createGenre(newGenre);

        res.status(201).json({
            message: "Genre created successfully",
            genre: createdGenre
        });
    } catch (error) {
        console.error("Error creating genre:", error);
        if (error instanceof Error) {
            res.status(500).json({ message: "Server error: " + error.message });
        } else {
            res.status(500).json({ message: "Server error" });
        }
    }
};

export const getAllGenres = async (_req: Request, res: Response) => {
    try {
        const genres = await GenreService.getAllGenres();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error });
    }
};

export const deleteGenreById = async (req: Request, res: Response) => {
    const genreId = req.params.id as string;

    try {
        const existingGenre = await GenreService.getGenreById(genreId);
        if (!existingGenre) {
            return res.status(404).json({ message: "Genre not found" });
        }

        await GenreService.deleteGenreById(genreId);
        res.status(200).json({ message: "Genre deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error: " + error });
    }
};