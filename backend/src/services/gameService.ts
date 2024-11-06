import {GameDTO} from "../dto/gameDTO";
import {Game} from "../models/game";
import {Platform} from "../models/platform";
import {Publisher} from "../models/publisher";
import {Genre} from "../models/genre";

class GameService {
    async createGame(gameData: Partial<GameDTO>): Promise<GameDTO> {
        gameData.created_at = new Date(Date.now());
        const game = new Game(gameData);
        return await game.save();
    }

    async getAllGames(): Promise<GameDTO[]> {
        return await Game.find().exec();
    }

    async deleteAllGames(): Promise<void> {
        await Game.deleteMany({});
    }
    async getGameByParam(gameTitle?: string, genreName?: string, publisherName?: string, platformName?: string): Promise<GameDTO[]> {
        const query: any = {};

        if (gameTitle) {
            query.title = { $regex: gameTitle, $options: "i" };
        }

        if (genreName) {
            const genre = await Genre.findOne({ name: { $regex: genreName, $options: "i" } }).exec();
            if (genre) {
                query.genre_id = genre._id;
            }
        }

        if (publisherName) {
            const publisher = await Publisher.findOne({ name: { $regex: publisherName, $options: "i" } }).exec();
            if (publisher) {
                query.publisher_id = publisher._id;
            }
        }

        if (platformName) {
            const platform = await Platform.findOne({ name: { $regex: platformName, $options: "i" } }).exec();
            if (platform) {
                query.platforms = { $elemMatch: { platform_id: platform._id } };
            }
        }

        return await Game.find(query).populate('genre_id').populate('publisher_id').populate('platforms.platform_id').exec();
    }
}

export default new GameService();
