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
        return await Game.find().populate("genre").populate("publisher").populate("platforms.platform").exec();
    }

    async getGameById(id: string) {
        return await Game.findById(id).populate("genre").populate("publisher").populate("platforms.platform").exec();
    }

    async deleteAllGames(): Promise<void> {
        await Game.deleteMany({});
    }

    async getGameByParam(
        gameTitle?: string,
        genreName?: string,
        publisherName?: string,
        platformName?: string,
        year?: number,
        maxYear?: number
    ): Promise<GameDTO[]> {
        const query: any = {};

        if (gameTitle) {
            query.title = {$regex: gameTitle, $options: "i"};
        }

        if (genreName) {
            const genre = await Genre.findOne({name: {$regex: genreName, $options: "i"}}).exec();
            if (genre) {
                query.genre = genre._id;
            }
        }

        if (publisherName) {
            const publisher = await Publisher.findOne({name: {$regex: publisherName, $options: "i"}}).exec();
            if (publisher) {
                query.publisher = publisher._id;
            }
        }

        if (platformName) {
            const platform = await Platform.findOne({name: {$regex: platformName, $options: "i"}}).exec();
            if (platform) {
                query.platforms = {$elemMatch: {platform: platform._id}};
            }
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

        return await Game.find(query).populate("genre").populate("publisher").populate("platforms.platform").exec();
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
