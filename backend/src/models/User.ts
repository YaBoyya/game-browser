import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: Date.now },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
