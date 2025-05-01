import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../repositories/userRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const register = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(username, hashedPassword);
  return user;
};

export const login = async (username: string, password: string) => {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '7d',
  });

  return { token };
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
