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

    async deleteGenreById(genreId: string): Promise<void> {
        await Genre.findByIdAndDelete(genreId).exec();
    }

    async getGenreById(genreId: string): Promise<GenreDTO | null> {
        return await Genre.findById(genreId).exec();
    }

    async getGenreByName(name: string): Promise<GenreDTO | null> {
        return await Genre.findOne({ name: name }).exec();
    }
}

export default new GenreService();