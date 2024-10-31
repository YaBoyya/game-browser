import {ObjectId} from "mongoose";

export interface PlatformDTO {
    _id?: ObjectId;
    name: string;
    description?: string;
}
