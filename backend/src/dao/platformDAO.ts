import {Platform, PlatformEntity} from "../models/platform";
import {PlatformDTO} from "../dto/platformDTO";

class PlatformDAO {
    async createPlatform(platformData: Partial<PlatformDTO>): Promise<PlatformEntity> {
        const platform = new Platform(platformData);
        return await platform.save();
    }

    async getAllPlatforms(): Promise<PlatformDTO[]> {
        return await Platform.find().exec();
    }

    async deleteAllPlatforms(): Promise<void> {
        await Platform.deleteMany({});
    }
}

export default new PlatformDAO();