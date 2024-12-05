import {UserDTO} from "../dto/userDTO";
import {Game} from "../models/game";
import {User, UserEntity} from "../models/user";

class UserService {
    async createUser(userData: Partial<UserDTO>): Promise<UserEntity> {
        userData.created_at = new Date(Date.now());
        const user = new User(userData);
        return await user.save();
    }

    async deleteAllUsers(): Promise<void> {
        await User.deleteMany({});
    }

    async getUserById(userId: string) {
        return await User.findById(userId).populate("owned_games").exec();
    }

    async deleteUserById(userId: string) {
        await User.findByIdAndDelete(userId).exec();
    }

    async getUsers(username?: string, email?: string): Promise<UserDTO[]> {
        const query: any = {};

        if (username) {
            query.username = {$regex: new RegExp(username, "i")};
        }

        if (email) {
            query.email = {$regex: new RegExp(email, "i")};
        }

        return await User.find(query).exec();
    }

    async banUserById(userId: string) {
        await User.findByIdAndUpdate(userId, {status: "banned"});
    }

    async unbanUserById(userId: string) {
        await User.findByIdAndUpdate(userId, {status: "active"});
    }

    async makeUserAdmin(userId: string) {
        await User.findByIdAndUpdate(userId, {role: "admin"});
    }

    async revokeUserAdmin(userId: string) {
        await User.findByIdAndUpdate(userId, {role: "user"});
    }

    async addGameToUserList(userId: string, gameId: string) {
        const user = await User.findById(userId).exec();
        if (!user) {
            throw new Error("User not found");
        }

        const game = await Game.findById(gameId).exec();
        if (!game) {
            throw new Error("Game not found" + gameId);
        }

        const gameExists = user.owned_games?.some((g) => g.game.toString() === gameId);
        if (gameExists) {
            throw new Error("Game already in owned games");
        }

        const newGame = {
            game: game._id,
            added_date: new Date()
        };

        user.owned_games = user.owned_games || [];
        user.owned_games.push(newGame);

        await user.save();
        return user;
    }

    async getUserOwnedGames(userId: string) {
        const user = await User.findById(userId)
            .populate({
                path: "owned_games.game",
                populate: [{path: "genre"}, {path: "publisher"}, {path: "platforms.platform"}, {path: "requirements"}]
            })
            .exec();
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

        const gameExists = user.owned_games?.some((g) => g.game.toString() === gameId);
        if (!gameExists) {
            throw new Error("Game not found in owned games");
        }

        user.owned_games = user.owned_games?.filter((g) => g.game.toString() !== gameId);

        await user.save();
        return user;
    }
}

export default new UserService();
