import express from 'express';
import { createUser, getAllUsers } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post("/", createUser);
userRoutes.get("/", getAllUsers);

export default userRoutes;