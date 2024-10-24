import {RequirementsDTO} from "../dto/requirementsDTO";
import {Requirements} from "../models/requirements";

class RequirementsDAO {
    async createRequirements(requirementsData: Partial<RequirementsDTO>): Promise<RequirementsDTO> {
        const requirements = new Requirements(requirementsData);
        return await requirements.save();
    }

    async getAllRequirements(): Promise<RequirementsDTO[]> {
        return await RequirementsModel.find().exec();
    }

    async deleteAllRequirements(): Promise<void> {
        await RequirementsModel.deleteMany({});
    }
}

export default new RequirementsDAO();