import mongoose, {Document, ObjectId, Schema} from "mongoose";
import {Game} from "./game";

export interface PublisherEntity extends Document {
    _id: ObjectId;
    name: string;
    established: Date;
    description: string;
    created_at: Date;
}

interface PublisherModel extends mongoose.Model<PublisherEntity> {
    findByName(name: string): Promise<PublisherEntity | null>;
    findByNameExact(name: string): Promise<PublisherEntity | null>;
}

const PublisherSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    established: {type: Date, required: true},
    description: {type: String, required: true},
    created_at: {type: Date, required: true}
});

PublisherSchema.statics.findByName = function (name: string): Promise<PublisherEntity | null> {
    return this.findOne({
        name: new RegExp(name, "i")
    }).exec();
};

PublisherSchema.statics.findByNameExact = function (name: string): Promise<PublisherEntity | null> {
    return this.findOne({
        name: name
    }).exec();
};

PublisherSchema.pre("findOneAndDelete", async function (next) {
    const publisherId = this.getQuery()._id;

    try {
        await Game.updateMany({publisher: publisherId}, {$unset: {publisher: ""}});
        next();
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error while cleaning up publisher references: ${error.message}`);
            next(error);
        }
    }
});

export const Publisher = mongoose.model<PublisherEntity, PublisherModel>("Publisher", PublisherSchema);
