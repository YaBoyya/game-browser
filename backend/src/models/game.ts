import mongoose, {ObjectId, Schema, Types} from "mongoose";

export interface GameEntity {
    _id: ObjectId;
    title: string;
    description?: string;
    release_date: Date;
    genre_id: ObjectId;
    publisher_id: ObjectId;
    platforms?: {platform_id: ObjectId; release_date: string}[];
    requirements_id?: ObjectId;
    created_at: Date;
}

interface GameModel extends mongoose.Model<GameEntity> {
    findByTitle(title: string): Promise<GameEntity | null>;
    findByPublisher(publisherId: string): Promise<GameEntity[]>;
    findByGenre(genreId: string): Promise<GameEntity[]>;
    findByPlatform(platformId: string): Promise<GameEntity[]>;
}

const GameSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    release_date: {type: Date, required: true},
    genre_id: {type: Types.ObjectId, ref: "Genres", required: true},
    publisher_id: {type: Types.ObjectId, ref: "Publishers", required: true},
    platforms: {
        type: [
            {
                platform_id: {
                    type: Types.ObjectId,
                    ref: "Platforms"
                },
                release_date: {type: String, required: true}
            }
        ],
        required: true,
        minlength: 1,
        default: []
    },
    requirements_id: {type: Types.ObjectId, ref: "Requirements"},
    created_at: {type: Date, default: Date.now}
});

GameSchema.statics.findByTitle = function (
    title: string
): Promise<GameEntity | null> {
    return this.findOne({
        title: new RegExp(title, "i")
    }).exec();
};

GameSchema.statics.findByPublisher = function (
    publisherId: string
): Promise<GameEntity[]> {
    return this.find({
        publisher_id: new Types.ObjectId(publisherId)
    }).exec();
};

GameSchema.statics.findByGenre = function (
    genreId: ObjectId
): Promise<GameEntity[]> {
    return this.find({
        genre_id: genreId
    }).exec();
};

GameSchema.statics.findByPlatform = function (
    platformId: ObjectId
): Promise<GameEntity[]> {
    return this.find({
        "platforms.platform_id": platformId
    }).exec();
};

export const Game = mongoose.model<GameEntity, GameModel>("Games", GameSchema);
