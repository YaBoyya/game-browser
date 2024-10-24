import { Request, Response } from "express";
import {UserDTO} from "../dto/userDTO";
import {User} from "../dao/userDAO";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, status }: UserDTO = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const user = new User({
      username,
      email,
      password,
      status: status || 'active',
      owned_games: [],
      role: 'user',
      created_at: new Date(),
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error});
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  console.log("getAllUsers");

  try {
    const users = await User.find().exec();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error: '+ error});
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    await User.deleteMany({});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error });
  }
};

