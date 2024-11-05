import {ObjectId} from "mongoose";

export interface GameDTO {
    _id: ObjectId;
    title: string;
    description?: string;
    release_date: Date;
    genre_id: ObjectId;
    publisher_id: ObjectId;
    platforms?: {platform_id: ObjectId; release_date: string}[];
    requirements_id?: ObjectId;
    created_at: Date;
}
