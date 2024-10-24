import mongoose, { Schema } from 'mongoose';

export interface PlatformEntity {
    _id: string;
    name: string;
    description?: string;
}

const PlatformSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
});

export const Platform = mongoose.model<PlatformEntity>('Platforms', PlatformSchema);