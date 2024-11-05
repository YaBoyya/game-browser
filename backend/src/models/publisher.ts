import mongoose, {Document, ObjectId, Schema} from "mongoose";

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

PublisherSchema.statics.findByName = function (
    name: string
): Promise<PublisherEntity | null> {
    return this.findOne({
        name: new RegExp(name, "i")
    }).exec();
};

PublisherSchema.statics.findByNameExact = function (
    name: string
): Promise<PublisherEntity | null> {
    return this.findOne({
        name: name
    }).exec();
};

export const Publisher = mongoose.model<PublisherEntity, PublisherModel>(
    "Publisher",
    PublisherSchema
);
