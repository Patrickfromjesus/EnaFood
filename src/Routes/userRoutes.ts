import express, { NextFunction, Request, Response } from 'express';
import UserController from '../Controllers/userController';
import { validateLogin, validateUser } from '../Middlewares/validateUser';

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'OK!' }));

userRouter.post('/create', validateUser, async (req: Request, res: Response, next: NextFunction) => (
  new UserController(req, res, next).createUser()));

userRouter.post('/login', validateLogin, async (req: Request, res: Response, next: NextFunction) => (
  new UserController(req, res, next).loginUser()));

export default userRouter;
