import {ObjectId} from "mongoose";

export interface GameDTO {
    _id: ObjectId;
    title: string;
    description?: string;
    release_date: Date;
    genre: ObjectId;
    publisher: ObjectId;
    platforms?: {platform: ObjectId; release_date: string}[];
    requirements?: ObjectId;
    created_at: Date;
}
