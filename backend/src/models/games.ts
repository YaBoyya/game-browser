import mongoose, {Schema, Types} from 'mongoose';

export interface GamesEntity {
    title: string;
    description?: string;
    release_date: Date;
    genre_id: string;
    publisher_id: string;
    platforms?: { platform_id: string; release_date: string }[];
    requirements_id?: string;
    created_at: Date;
}

const GameSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    release_date: { type: Date, required: true },
    genre_id: { type: Types.ObjectId, ref: 'Genres', required: true },
    publisher_id: { type: Types.ObjectId, ref: 'Publishers', required: true },
    platforms: [{
        platform_id: { type: Types.ObjectId, ref: 'Platforms', required: true },
        release_date: { type: String, required: true }
    }],
    requirements_id: { type: Types.ObjectId, ref: 'Requirements' },
    created_at: { type: Date, default: Date.now }
});

export const Game = mongoose.model<GamesEntity>('Games', GameSchema);