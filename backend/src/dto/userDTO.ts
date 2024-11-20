import {ObjectId} from "mongoose";

export interface UserDTO {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    status: "active" | "inactive" | "banned";
    owned_games?: {game_id: ObjectId; added_date: Date}[];
    role: "admin" | "user";
    created_at?: Date;
}
