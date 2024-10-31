import mongoose, {ObjectId, Schema} from "mongoose";

export interface RequirementsEntity {
    _id: ObjectId;
    min_cpu: string;
    min_ram: string;
    min_gpu: string;
    min_storage: string;
    rec_cpu?: string;
    rec_ram?: string;
    rec_gpu?: string;
    rec_storage?: string;
}

const RequirementsSchema: Schema = new Schema({
    min_cpu: {type: String, required: true},
    min_ram: {type: String, required: true},
    min_gpu: {type: String, required: true},
    min_storage: {type: String, required: true},
    rec_cpu: {type: String},
    rec_ram: {type: String},
    rec_gpu: {type: String},
    rec_storage: {type: String}
});

export const Requirements = mongoose.model<RequirementsEntity>(
    "Requirements",
    RequirementsSchema
);
