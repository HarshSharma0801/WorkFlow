import { Request, Response } from 'express';
import User from '../modals/user';


export const getUserByEmail = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.query;
console.log(email)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.query;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
