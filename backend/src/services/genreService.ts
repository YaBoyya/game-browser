import {GenreDTO} from "../dto/genreDTO";
import {Genre} from "../models/genre";

class GenreService {
    async createGenre(genreData: Partial<GenreDTO>): Promise<GenreDTO> {
        const genre = new Genre(genreData);
        return await genre.save();
    }

    async getAllGenres(): Promise<GenreDTO[]> {
        return await Genre.find().exec();
    }

    async deleteAllGenres(): Promise<void> {
        await Genre.deleteMany({});
    }
}

export default new GenreService();
