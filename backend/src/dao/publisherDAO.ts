import { PublisherDTO } from "../dto/publisherDTO";
import { Publisher, PublisherEntity } from "../models/publisher";

class PublisherDAO {
    async createPublisher(publisherData: Partial<PublisherDTO>): Promise<PublisherDTO> {
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

export default new PublisherDAO();