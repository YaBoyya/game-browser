import {Request} from "express";
import {UserEntity} from "../models/user";

export default interface AuthRequest extends Request {
    user?: UserEntity;
}
