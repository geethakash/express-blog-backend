import { Request, Response, NextFunction } from 'express';
import User, { UserDocument } from '../models/User';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'secret';

function generateToken(user: UserDocument) {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, isActive: user.isActive },
    secretKey,
    {
      expiresIn: '1h',
    }
  );
}

export function verifyToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, secretKey);
}

export const register = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  // check all fields are provided
  if (!name || !username || !email || !password) {
    return res.status(400).json({
      message: 'Please provide all required fields',
    });
  }

  const user: UserDocument | null = await User.findOne({ username });

  // check user already exists
  if (user) {
    return res.status(400).json({
      message: 'Username already exists',
    });
  }

  //   check email is valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      message: 'Invalid email address',
    });
  }

  //   check email already in use
  const emailUser = await User.findOne({ email });
  if (emailUser) {
    return res.status(400).json({
      message: 'Email already in use',
    });
  }

  // check password length
  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters',
    });
  }

  // create user
  const newUser: UserDocument = new User({
    name,
    username,
    email,
    password,
  });
  await newUser.save();
  return res.status(201).json(newUser);
};

export const login = async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, password } = req.body;

  // check all fields are provided
  if (!username || !password) {
    return res.status(400).json({
      message: 'Please provide all required fields',
    });
  }

  const user: UserDocument | null = await User.findOne({ username });

  // check user exists
  if (!user) {
    return res.status(400).json({
      message: 'Username does not exist',
    });
  }

  // check password is correct
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return res.status(400).json({
      message: 'Invalid password',
    });
  }

  // generate token
  const token = generateToken(user);

  // return user and token
  return res.status(200).json({
    user: {
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
    token,
  });
};

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    console.log('user', req.user.id);
    return res.status(200).json({
      success: true,
      message: 'You are authenticated',
    });
  }
  return res.status(401).json({
    success: false,
    message: 'You are not authenticated',
  });
};
