import express, { NextFunction, Request, Response } from 'express';

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => res.status(200).json({ message: 'OK!' }));

export default userRouter;