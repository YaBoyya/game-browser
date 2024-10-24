import mongoose, { Schema } from 'mongoose';

export interface GenreEntity {
    _id: string;
    name: string;
}

const GenreSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true }
});

export const Genre = mongoose.model<GenreEntity>('Genres', GenreSchema);