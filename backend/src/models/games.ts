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

interface GameModel extends mongoose.Model<GamesEntity> {
    findByTitle(title: string): Promise<GamesEntity | null>;
    findByPublisher(publisherId: string): Promise<GamesEntity[]>;
    findByGenre(genreId: string): Promise<GamesEntity[]>;
    findByPlatform(platformId: string): Promise<GamesEntity[]>;
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

GameSchema.statics.findByTitle = function(title: string): Promise<GamesEntity | null> {
    return this.findOne({
        title: new RegExp(title, 'i')
    }).exec();
};

GameSchema.statics.findByPublisher = function(publisherId: string): Promise<GamesEntity[]> {
    return this.find({
        publisher_id: new Types.ObjectId(publisherId)
    }).exec();
};

GameSchema.statics.findByGenre = function(genreId: string): Promise<GamesEntity[]> {
    return this.find({
        genre_id: new Types.ObjectId(genreId)
    }).exec();
};

GameSchema.statics.findByPlatform = function(platformId: string): Promise<GamesEntity[]> {
    return this.find({
        'platforms.platform_id': new Types.ObjectId(platformId)
    }).exec();
};

export const Game = mongoose.model<GamesEntity, GameModel>('Games', GameSchema);
