import {PublisherDTO} from "../dto/publisherDTO";
import {Publisher} from "../models/publisher";

class PublisherService {
    async createPublisher(publisherData: Partial<PublisherDTO>): Promise<PublisherDTO> {
        publisherData.created_at = new Date(Date.now());
        const publisher = new Publisher(publisherData);
        return await publisher.save();
    }

    async getAllPublishers(): Promise<PublisherDTO[]> {
        return await Publisher.find().exec();
    }

    async deletePublisherById(publisherId: string): Promise<void> {
        await Publisher.findByIdAndDelete(publisherId).exec();
    }

    async getPublisherById(publisherId: string): Promise<PublisherDTO | null> {
        return await Publisher.findById(publisherId).exec();
    }

    async getPublisherByName(name: string): Promise<PublisherDTO | null> {
        return await Publisher.findOne({ name: name }).exec();
    }
}
export default new PublisherService();