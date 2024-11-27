import {Platform, PlatformEntity} from "../models/platform";
import {PlatformDTO} from "../dto/platformDTO";

class PlatformService {
    async createPlatform(platformData: Partial<PlatformDTO>): Promise<PlatformEntity> {
        const platform = new Platform(platformData);
        return await platform.save();
    }

    async getAllPlatforms(): Promise<PlatformDTO[]> {
        return await Platform.find().exec();
    }

    async deletePlatformById(platformId: string): Promise<void> {
        await Platform.findByIdAndDelete(platformId);
    }

    async getPlatformByName(name: string): Promise<PlatformEntity | null> {
        return await Platform.findOne({name: name}).exec();
    }

    async getPlatformById(platformId: string): Promise<PlatformEntity | null> {
        return await Platform.findById(platformId).exec();
    }
}

export default new PlatformService();
