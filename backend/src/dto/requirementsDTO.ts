import {ObjectId} from "mongoose";

export interface RequirementsDTO {
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
