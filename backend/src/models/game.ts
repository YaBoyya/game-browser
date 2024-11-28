import mongoose, {ObjectId, Schema, Types} from "mongoose";

export interface GameEntity {
    _id: ObjectId;
    title: string;
    description?: string;
    release_date: Date;
    genre: ObjectId;
    publisher: ObjectId;
    platforms?: {platform: ObjectId; release_date: string}[];
    requirements?: ObjectId;
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
    genre: {type: Types.ObjectId, ref: "Genres", required: true},
    publisher: {type: Types.ObjectId, ref: "Publisher", required: true},
    platforms: {
        type: [
            {
                platform: {type: Types.ObjectId, ref: "Platforms"},
                release_date: {type: String, required: true}
            }
        ],
        required: true,
        minlength: 1,
        default: []
    },
    requirements: {type: Types.ObjectId, ref: "Requirements"},
    created_at: {type: Date, default: Date.now}
});

GameSchema.statics.findByTitle = function (title: string): Promise<GameEntity | null> {
    return this.findOne({
        title: new RegExp(title, "i")
    }).exec();
};

GameSchema.statics.findByPublisher = function (publisherId: string): Promise<GameEntity[]> {
    return this.find({
        publisher: new Types.ObjectId(publisherId)
    }).exec();
};

GameSchema.statics.findByGenre = function (genreId: ObjectId): Promise<GameEntity[]> {
    return this.find({
        genre: genreId
    }).exec();
};

GameSchema.statics.findByPlatform = function (platformId: ObjectId): Promise<GameEntity[]> {
    return this.find({
        "platforms.platform": platformId
    }).exec();
};

export const Game = mongoose.model<GameEntity, GameModel>("Games", GameSchema);
