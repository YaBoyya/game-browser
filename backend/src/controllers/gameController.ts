import {Request, Response} from "express";
import {GameDTO} from "../dto/gameDTO";
import {GenreDTO} from "../dto/genreDTO";
import PlatformDataDTO from "../dto/platformDataDTO";
import {PlatformDTO} from "../dto/platformDTO";
import {PublisherDTO} from "../dto/publisherDTO";
import {Genre} from "../models/genre";
import {Platform} from "../models/platform";
import {Publisher} from "../models/publisher";
import GameService from "../services/gameService";
import GenreService from "../services/genreService";
import PlatformService from "../services/platformService";
import PublisherService from "../services/publisherService";
import RequirementsService from "../services/requirementsService";

export const createGame = async (req: Request, res: Response) => {
    try {
        const {gameData, genreData, platformData, requirementsData, publisherData} = req.body;

        let genre: GenreDTO | null = await Genre.findOne({
            name: genreData.name
        }).exec();
        if (!genre) {
            genre = await GenreService.createGenre(genreData);
        }

        const platforms = await Promise.all(
            platformData.map(async (platform: Partial<PlatformDataDTO>) => {
                let existingPlatform: PlatformDTO | null = await Platform.findOne({
                    name: platform.name
                }).exec();
                if (!existingPlatform) {
                    existingPlatform = await PlatformService.createPlatform(platform);
                }
                return {
                    platform: existingPlatform._id,
                    release_date: platform.release_date
                };
            })
        );

        let requirementsId;
        if (requirementsData) {
            const requirements = await RequirementsService.createRequirements(requirementsData);
            requirementsId = requirements._id;
        }

        let publisher: PublisherDTO | null = await Publisher.findOne({
            name: publisherData.name
        }).exec();
        if (!publisher) {
            publisher = await PublisherService.createPublisher(publisherData);
        }

        const newGameData = {
            ...gameData,
            genre: genre._id,
            platforms: platforms,
            requirements: requirementsId,
            publisher: publisher._id
        };

        const createdGame = await GameService.createGame(newGameData);

        res.status(201).json({
            message: "Game created successfully",
            game: createdGame,
            genre,
            platforms,
            requirementsId,
            publisher
        });
    } catch (error) {
        console.error("Error creating game:", error);
        if (error instanceof Error) {
            res.status(500).json({message: "Server error: " + error.message});
        } else {
            res.status(500).json({message: "Server error"});
        }
    }
};

export const getAllGames = async (_req: Request, res: Response) => {
    try {
        const games = await GameService.getAllGames();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};

export const getFilteredGames = async (req: Request, res: Response) => {
    try {
        const gameTitle = req.query.gameTitle as string;
        const genre = req.query.genre as string;
        const publisher = req.query.publisher as string;
        const platform = req.query.platform as string;
        const year = parseInt(req.query.year as string, 10);
        const maxYear = parseInt(req.query.maxYear as string, 10);

        if ((req.query.year && isNaN(year)) || (req.query.maxYear && isNaN(maxYear))) {
            res.status(400).json({message: "Year and maxYear must be valid integers"});
            return;
        }

        const games = await GameService.getGameByParam(gameTitle, genre, publisher, platform, year, maxYear);
        if (games.length > 0) {
            res.status(200).json(games);
        } else {
            res.status(404).json({message: "Game not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};

export const getGameById = async (req: Request, res: Response) => {
    const gameId = req.params.gameId;

    try {
        const game = await GameService.getGameById(gameId);
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({message: "Game not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};

export const deleteGameById = async (req: Request, res: Response) => {
    const gameId = req.query.gameId as string;

    if (!gameId) {
        res.status(400).json({message: "gameId cannot be empty"});
        return;
    }

    try {
        await GameService.deleteGameById(gameId);
        res.status(200).json({message: "Game deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};

export const updateGame = async (req: Request, res: Response) => {
    const gameId = req.query.gameId as string;
    const updateData = req.body as Partial<GameDTO>;

    if (!gameId) {
        res.status(400).json({message: "gameId cannot be empty"});
        return;
    }

    try {
        const updatedGame = await GameService.updateGame(gameId, updateData);
        res.status(200).json({message: "Game updated successfully", game: updatedGame});
    } catch (error) {
        res.status(500).json({message: "Server error: " + error});
    }
};
