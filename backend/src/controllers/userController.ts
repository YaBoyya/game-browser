import { Request, Response } from 'express';
import UserDao from '../dao/userDAO';

export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await UserDao.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserDao.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error });
    }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
    try {
      await UserDao.deleteAllUsers();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error });
    }
};