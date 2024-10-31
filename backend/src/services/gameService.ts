import {GameDTO} from "../dto/gameDTO";
import {Game} from "../models/game";

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
}

export default new GameService();
