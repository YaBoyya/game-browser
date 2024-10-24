import mongoose, { Schema } from 'mongoose';

export interface PlatformEntity {
    name: string;
    description?: string;
}

interface PlatformModel extends mongoose.Model<PlatformEntity> {
    findByName(name: string): Promise<PlatformEntity | null>;
    findByNameExact(name: string): Promise<PlatformEntity | null>;
    findAllSorted(): Promise<PlatformEntity[]>;
    findMultipleByNames(names: string[]): Promise<PlatformEntity[]>;
}

const PlatformSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
});

PlatformSchema.statics.findByName = function(name: string): Promise<PlatformEntity | null> {
    return this.findOne({
        name: new RegExp(name, 'i')
    }).exec();
};

PlatformSchema.statics.findByNameExact = function(name: string): Promise<PlatformEntity | null> {
    return this.findOne({
        name: name
    }).exec();
};

PlatformSchema.statics.findAllSorted = function(): Promise<PlatformEntity[]> {
    return this.find()
        .sort({ name: 1 })
        .exec();
};

PlatformSchema.statics.findMultipleByNames = function(names: string[]): Promise<PlatformEntity[]> {
    return this.find({
        name: { $in: names }
    }).exec();
};

export const Platform = mongoose.model<PlatformEntity, PlatformModel>('Platforms', PlatformSchema);
