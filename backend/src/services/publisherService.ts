import {PublisherDTO} from "../dto/publisherDTO";
import {Publisher} from "../models/publisher";

class PublisherService {
    async createPublisher(
        publisherData: Partial<PublisherDTO>
    ): Promise<PublisherDTO> {
        publisherData.created_at = new Date(Date.now());
        const publisher = new Publisher(publisherData);
        return await publisher.save();
    }

    async getAllPublishers(): Promise<PublisherDTO[]> {
        return await Publisher.find().exec();
    }

    async deleteAllPublishers(): Promise<void> {
        await Publisher.deleteMany({});
    }
}

export default new PublisherService();
