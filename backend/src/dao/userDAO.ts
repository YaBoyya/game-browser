import mongoose, { Schema, Document } from 'mongoose';

export interface IUser{
    _id?: string;
    username: string;
    email: string;
    password: string;
    status: 'active' | 'inactive';
    owned_games: { game_id: mongoose.Schema.Types.ObjectId; added_date: Date }[];
    role: 'admin' | 'user';
    created_at?: Date;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    owned_games: [{
        game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Games', required: true },
        added_date: { type: Date }
    }],
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    created_at: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);