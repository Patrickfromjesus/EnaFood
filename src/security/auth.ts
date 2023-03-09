import jwt from 'jsonwebtoken';
import 'dotenv/config';
import IPayload from '../Interfaces/IPayload';

const SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: IPayload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: '5h' });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const { id } = jwt.verify(token, SECRET) as IPayload;
    return id;
  } catch (error) {
    console.log(error);
  }
};
