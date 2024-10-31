import {UserEntity, User} from "../models/user";
import {UserDTO} from "../dto/userDTO";

class UserService {
    async createUser(userData: Partial<UserDTO>): Promise<UserEntity> {
        userData.created_at = new Date(Date.now());
        const user = new User(userData);
        return await user.save();
    }

    async getAllUsers(): Promise<UserDTO[]> {
        // @ts-ignore  TODO: id is a string somewhere in model - FIX
        return await User.find().exec();
    }

    async deleteAllUsers(): Promise<void> {
        await User.deleteMany({});
    }
}

export default new UserService();
