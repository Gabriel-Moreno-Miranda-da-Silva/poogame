import type { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

export const UserController = {
  getUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }
};