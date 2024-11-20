import {UserEntity, User} from "../models/user";
import {UserDTO} from "../dto/userDTO";
import {Game} from "../models/game";
import {Types} from "mongoose";

class UserService {
    async createUser(userData: Partial<UserDTO>): Promise<UserEntity> {
        userData.created_at = new Date(Date.now());
        const user = new User(userData);
        return await user.save();
    }

    async getAllUsers(): Promise<UserDTO[]> {
        return await User.find().exec();
    }

    async deleteAllUsers(): Promise<void> {
        await User.deleteMany({});
    }

    async getUserById(userId: string) {
        return await User.findById(userId).exec();
    }

    async deleteUserById(userId: string) {
        await User.findByIdAndDelete(userId).exec();
    }
    async getUserByParam(
        username?: string,
        email?: string
    ): Promise<UserDTO[]> {
        const query: any = {};

        if (username) {
            query.username = { $regex: new RegExp(username, "i") };
        }

        if (email) {
            query.email = { $regex: new RegExp(email, "i") };
        }

        return await User.find(query).exec();
    }

    async addGameToUserList(userId: string, gameId: string) {
        const user = await User.findById(userId).exec();
        if (!user) {
            throw new Error("User not found");
        }

        const game = await Game.findById(gameId).exec();
        if (!game) {
            throw new Error("Game not found");
        }

        const gameExists = user.owned_games?.some(g => g.game_id.toString() === gameId);
        if (gameExists) {
            throw new Error("Game already in owned games");
        }

        const newGame = {
            game_id: game._id,
            added_date: new Date()
        };

        user.owned_games = user.owned_games || [];
        user.owned_games.push(newGame);

        await user.save();
        return user;
    }

    async getUserOwnedGames(userId: string) {
        const user = await User.findById(userId).populate('owned_games.game_id').exec();
        if (!user) {
            throw new Error("User not found");
        }
        return user.owned_games;
    }

    async deleteGameFromUserList(userId: string, gameId: string) {
        const user = await User.findById(userId).exec();
        if (!user) {
            throw new Error("User not found");
        }

        const gameExists = user.owned_games?.some(g => g.game_id.toString() === gameId);
        if (!gameExists) {
            throw new Error("Game not found in owned games");
        }

        user.owned_games = user.owned_games?.filter(g => g.game_id.toString() !== gameId);

        await user.save();
        return user;
    }

}

export default new UserService();
