import {ObjectId} from "mongoose";

export interface PublisherDTO {
    _id: ObjectId;
    name: string;
    established: Date;
    description?: string;
    created_at?: Date;
}
