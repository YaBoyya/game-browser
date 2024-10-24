import {Game} from "../models/games";
import {GamesDTO} from "../dto/gamesDTO";

class GameService {
    async createGame(gameData: Partial<GamesDTO>): Promise<GamesDTO> {
        const game = new Game(gameData);
        return await game.save();
    }

    async getAllGames(): Promise<GamesDTO[]> {
        return await Game.find().exec();
    }

    async deleteAllGames(): Promise<void> {
        await Game.deleteMany({});
    }
}

export default new GameService();
