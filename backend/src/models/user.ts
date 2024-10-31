import mongoose, {Schema, Types} from "mongoose";

export interface UserEntity {
    username: string;
    email: string;
    password: string;
    status: "active" | "inactive" | "banned";
    owned_games: {game_id: mongoose.Schema.Types.ObjectId; added_date: Date}[];
    role: "admin" | "user";
    created_at?: Date;
}

interface UserModel extends mongoose.Model<UserEntity> {
    findByUsername(username: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findActiveUsers(): Promise<UserEntity[]>;
    findByGameId(gameId: string): Promise<UserEntity[]>;
}

const UserSchema: Schema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status: {
        type: String,
        enum: ["active", "inactive", "banned"],
        default: "active"
    },
    owned_games: [
        {
            game_id: {type: Types.ObjectId, ref: "Games", required: true},
            added_date: {type: Date}
        }
    ],
    role: {type: String, enum: ["admin", "user"], default: "user"},
    created_at: {type: Date, default: Date.now}
});

UserSchema.statics.findByUsername = function (
    username: string
): Promise<UserEntity | null> {
    return this.findOne({username}).exec();
};

UserSchema.statics.findByEmail = function (
    email: string
): Promise<UserEntity | null> {
    return this.findOne({email}).exec();
};

UserSchema.statics.findActiveUsers = function (): Promise<UserEntity[]> {
    return this.find({status: "active"}).exec();
};

UserSchema.statics.findByGameId = function (
    gameId: string
): Promise<UserEntity[]> {
    return this.find({
        "owned_games.game_id": new mongoose.Types.ObjectId(gameId)
    }).exec();
};

export const User = mongoose.model<UserEntity, UserModel>("User", UserSchema);
