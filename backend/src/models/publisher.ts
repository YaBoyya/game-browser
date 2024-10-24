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
    description: { type: String, required: true },
    created_at: { type: String, required: true }
});

export const Publisher = mongoose.model<PublisherEntity>('Publisher', PublisherSchema);