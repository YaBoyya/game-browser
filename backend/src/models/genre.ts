import mongoose, {ObjectId, Schema} from "mongoose";

export interface GenreEntity {
    _id: ObjectId;
    name: string;
}

const GenreSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true}
});

export const Genre = mongoose.model<GenreEntity>("Genres", GenreSchema);
