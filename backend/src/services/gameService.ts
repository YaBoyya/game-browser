import {GameDTO} from "../dto/gameDTO";
import {Game} from "../models/game";
import {Platform} from "../models/platform";
import {Publisher} from "../models/publisher";
import {Genre} from "../models/genre";
import {Types} from "mongoose";

class GameService {
    async createGame(gameData: Partial<GameDTO>): Promise<GameDTO> {
        gameData.created_at = new Date(Date.now());
        const game = new Game(gameData);
        return await game.save();
    }

    async getAllGames(): Promise<GameDTO[]> {
        return await Game.find()
            .populate("genre")
            .populate("publisher")
            .populate("platforms.platform")
            .populate("requirements")
            .exec();
    }

    async getGameById(id: string) {
        return await Game.findById(id)
            .populate("genre")
            .populate("publisher")
            .populate("platforms.platform")
            .populate("requirements")
            .exec();
    }

    async deleteAllGames(): Promise<void> {
        await Game.deleteMany({});
    }

    async getGameByParam(
        title?: string,
        genre?: string,
        publisher?: string,
        platform?: string,
        year?: number,
        maxYear?: number
    ): Promise<GameDTO[]> {
        const query: any = {};

        if (title) {
            query.title = {$regex: title, $options: "i"};
        }

        if (genre) {
            const foundGenre = await Genre.findOne({name: {$regex: genre, $options: "i"}}).exec();
            if (!foundGenre) {
                return [];
            }
            query.genre = foundGenre._id;
        }

        if (publisher) {
            const foundPublisher = await Publisher.findOne({name: {$regex: publisher, $options: "i"}}).exec();
            if (!foundPublisher) {
                return [];
            }
            query.publisher = foundPublisher._id;
        }

        if (platform) {
            const foundPlatform = await Platform.findOne({name: {$regex: platform, $options: "i"}}).exec();
            if (!foundPlatform) {
                return [];
            }
            query.platforms = {$elemMatch: {platform: foundPlatform._id}};
        }

        if (year) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year + 1, 0, 1);
            query.release_date = {$gte: startDate, $lt: endDate};
        }

        if (maxYear) {
            const endDate = new Date(maxYear + 1, 0, 1);
            if (query.release_date) {
                query.release_date.$lt = endDate;
            } else {
                query.release_date = {$lt: endDate};
            }
        }

        return await Game.find(query)
            .populate("genre")
            .populate("publisher")
            .populate("platforms.platform")
            .populate("requirements")
            .exec();
    }

    async deleteGameById(gameId: string): Promise<void> {
        const result = await Game.findByIdAndDelete(gameId).exec();
        if (!result) {
            throw new Error("Game not found");
        }
    }

    async updateGame(gameId: string, updateData: Partial<GameDTO>): Promise<GameDTO | null> {
        if (!Types.ObjectId.isValid(gameId)) {
            throw new Error("Invalid gameId");
        }

        const updatedGame = await Game.findByIdAndUpdate(
            gameId,
            {$set: updateData},
            {new: true, runValidators: true}
        ).exec();

        if (!updatedGame) {
            throw new Error("Game not found");
        }

        return updatedGame;
    }
}

export default new GameService();
