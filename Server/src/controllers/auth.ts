import { Request, Response } from 'express';
import User from '../modals/user';
import { hashPassword, comparePassword } from '../utils/hash';


export const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ valid:false ,message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    return res.status(201).json({valid:true , message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ valid:false , message: 'Server error', error });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ valid:false , message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ valid:false,message: 'Invalid credentials' });
    }

    const main = {user,id:user._id};
    return res.status(200).json({ valid:true , user:main });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};


