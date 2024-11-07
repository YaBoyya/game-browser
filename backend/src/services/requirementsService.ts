import {RequirementsDTO} from "../dto/requirementsDTO";
import {Requirements} from "../models/requirements";

class RequirementsService {
    async createRequirements(requirementsData: Partial<RequirementsDTO>): Promise<RequirementsDTO> {
        const requirements = new Requirements(requirementsData);
        return await requirements.save();
    }

    async getAllRequirements(): Promise<RequirementsDTO[]> {
        return await Requirements.find().exec();
    }

    async deleteAllRequirements(): Promise<void> {
        await Requirements.deleteMany({});
    }
}

export default new RequirementsService();
