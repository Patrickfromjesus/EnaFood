import express, { NextFunction, Request, Response } from 'express';
import UserController from '../Controllers/userController';

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'OK!' }));

userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => (
  new UserController(req, res, next).createUser()));

export default userRouter;
