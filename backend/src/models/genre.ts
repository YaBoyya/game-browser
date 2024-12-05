import mongoose, {ObjectId, Schema} from "mongoose";
import {Game} from "./game";

export interface GenreEntity {
    _id: ObjectId;
    name: string;
}

const GenreSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true}
});

GenreSchema.pre("findOneAndDelete", async function (next) {
    const genreId = this.getQuery()._id;

    try {
        await Game.updateMany({genre: genreId}, {$unset: {genre: ""}});
        next();
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error while cleaning up genre references: ${error.message}`);
            next(error);
        }
    }
});

export const Genre = mongoose.model<GenreEntity>("Genres", GenreSchema);
