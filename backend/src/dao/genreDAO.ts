import { GenreEntity, Genre } from "../models/genre";
import {GenreDTO} from "../dto/genereDTO";

class GenreDAO {
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

export default new GenreDAO();