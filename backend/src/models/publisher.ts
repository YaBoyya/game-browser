import mongoose, { Schema, Document } from 'mongoose';

export interface PublisherEntity extends Document {
    name: string;
    established: Date;
    description: string;
    created_at: string;
}

const PublisherSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    established: { type: Date, required: true },
    description: { type: String},
    created_at: { type: Date, default: Date.now }
});

export const Publisher = mongoose.model<IPublisher>('Publisher', PublisherSchema);