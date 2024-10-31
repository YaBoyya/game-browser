import {Request, Response} from "express";
import {GenreDTO} from "../dto/genreDTO";
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
        const {
            gameData,
            genreData,
            platformData,
            requirementsData,
            publisherData
        } = req.body;

        let genre: GenreDTO | null = await Genre.findOne({
            name: genreData.name
        }).exec();
        if (!genre) {
            genre = await GenreService.createGenre(genreData);
        }

        const platforms = await Promise.all(
            platformData.map(async (platform: Partial<PlatformDTO>) => {
                let existingPlatform: PlatformDTO | null =
                    await Platform.findOne({
                        name: platform.name
                    }).exec();
                if (!existingPlatform) {
                    existingPlatform =
                        await PlatformService.createPlatform(platform);
                }
                return {
                    platform_id: existingPlatform._id
                };
            })
        );

        let requirementsId;
        if (requirementsData) {
            const requirements =
                await RequirementsService.createRequirements(requirementsData);
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
            genre_id: genre._id,
            platforms: platforms,
            requirements_id: requirementsId,
            publisher_id: publisher._id
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
