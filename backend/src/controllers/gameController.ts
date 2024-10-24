import { Request, Response } from 'express';
import { PlatformDTO } from "../dto/platformDTO";
import GenreService from "../dao/genreService";
import RequirementsService from "../dao/requirementsService";
import GameService from "../dao/gameService";
import PlatformService from "../dao/platformService";
import PublisherService from "../dao/publisherService";
import { Genre } from "../models/genre";
import { Platform } from "../models/platform";
import { Publisher } from "../models/publisher";

export const createGame = async (req: Request, res: Response) => {
    try {
        const {
            gameData,
            genreData,
            platformData,
            requirementsData,
            publisherData
        } = req.body;

        let genre = await Genre.findOne({ name: genreData.name }).exec();
        if (!genre) {
            genre = await GenreService.createGenre(genreData);
        }

        const platforms = await Promise.all(
            platformData.map(async (platform: Partial<PlatformDTO>) => {
                let existingPlatform = await Platform.findOne({ name: platform.name }).exec();
                if (!existingPlatform) {
                    existingPlatform = await PlatformService.createPlatform(platform);
                }
                return {
                    platform_id: existingPlatform._id,
                    release_date: platform.release_date
                };
            })
        );

        let requirementsId;
        if (requirementsData) {
            const requirements = await RequirementsService.createRequirements(requirementsData);
            requirementsId = requirements._id;
        }

        let publisher = await Publisher.findOne({ name: publisherData.name }).exec();
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
            message: 'Game created successfully',
            game: createdGame,
            genre,
            platforms,
            requirementsId,
            publisher
        });
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

export const getAllGames= async (req: Request, res: Response) => {
    try {
        const games = await GameService.getAllGames();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error });
    }
};
